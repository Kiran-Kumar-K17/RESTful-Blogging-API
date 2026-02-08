pipeline {
    agent any

    environment {
        SONAR_HOME = tool "sonar"
        IMAGE_NAME = "devcanvas-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${IMAGE_NAME}:${IMAGE_TAG}"
        LATEST_IMAGE = "${IMAGE_NAME}:latest"
    }
    
    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
                echo "✅ Workspace cleaned"
            }
        }

        stage("Clone Code from GitHub") {
            steps {
                git url: "https://github.com/Kiran-Kumar-K17/RESTful-Blogging-API.git",
                    branch: "devops"
                echo "✅ Code cloned successfully"
            }
        }

        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv("sonar") {
                    sh """
                        $SONAR_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=devCanvas \
                        -Dsonar.projectKey=devCanvas \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**
                    """
                }
                echo "✅ SonarQube analysis completed"
            }
        }

        stage("Sonar Quality Gate") {
            steps {
                timeout(time: 5, unit: "MINUTES") {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage("OWASP Dependency Check") {
            steps {
                dependencyCheck additionalArguments: '''
                    --scan ./
                    --format HTML
                    --format XML
                ''', odcInstallation: 'Owasp'
                
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                echo "✅ OWASP Dependency Check completed"
            }
        }

        stage("Trivy FS Scan - Frontend") {
            steps {
                script {
                    sh '''
                        trivy fs frontend \
                            --severity HIGH,CRITICAL \
                            --skip-dirs frontend/node_modules \
                            --format table \
                            --exit-code 0 \
                            --output trivy-frontend-fs-report.txt
                    '''
                    archiveArtifacts artifacts: 'trivy-frontend-fs-report.txt', allowEmptyArchive: true
                    echo "✅ Frontend filesystem scan completed"
                }
            }
        }

        stage("Trivy FS Scan - Backend") {
            steps {
                script {
                    sh '''
                        trivy fs backend \
                            --severity HIGH,CRITICAL \
                            --skip-dirs backend/node_modules \
                            --format table \
                            --exit-code 0 \
                            --output trivy-backend-fs-report.txt
                    '''
                    archiveArtifacts artifacts: 'trivy-backend-fs-report.txt', allowEmptyArchive: true
                    echo "✅ Backend filesystem scan completed"
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                sh """
                    echo "🔨 Building Docker image..."
                    docker system prune -f
                    docker build \
                        --no-cache \
                        --pull \
                        -t ${FULL_IMAGE_NAME} \
                        -t ${LATEST_IMAGE} \
                        .
                    
                    echo "✅ Docker image built successfully"
                    docker images ${IMAGE_NAME}
                """
            }
        }

        stage("Trivy Image Scan") {
            steps {
                script {
                    // Create ignore file for base image vulnerabilities
                    sh '''
                        cat > .trivyignore << 'EOF'
# npm vulnerabilities from node:20-alpine base image
# These will be fixed when Node.js updates bundled npm
CVE-2024-21538
CVE-2025-64756
CVE-2026-23745
CVE-2026-23950
CVE-2026-24842
EOF
                    '''
                    
                    // Scan and generate report
                    sh """
                        trivy image \
                            --severity HIGH,CRITICAL \
                            --ignorefile .trivyignore \
                            --format table \
                            --exit-code 0 \
                            --output trivy-image-report.txt \
                            ${LATEST_IMAGE}
                    """
                    
                    archiveArtifacts artifacts: 'trivy-image-report.txt', allowEmptyArchive: true
                    
                    // Check for CRITICAL vulnerabilities (excluding ignored ones)
                    def scanResult = sh(
                        script: """
                            trivy image \
                                --severity CRITICAL \
                                --ignorefile .trivyignore \
                                --exit-code 1 \
                                --quiet \
                                ${LATEST_IMAGE}
                        """,
                        returnStatus: true
                    )
                    
                    if (scanResult != 0) {
                        echo "⚠️ WARNING: Critical vulnerabilities found in image"
                        echo "📄 Review trivy-image-report.txt for details"
                        // Uncomment to fail on critical vulnerabilities:
                        // error("Critical vulnerabilities detected!")
                    } else {
                        echo "✅ Image scan passed - no critical vulnerabilities"
                    }
                }
            }
        }

        stage('Create .env file') {
            steps {
                withCredentials([
                    string(credentialsId: 'DATABASE_URL', variable: 'DATABASE_URL'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'JWT_EXPIRES_IN', variable: 'JWT_EXPIRES_IN')
                ]) {
                    sh '''
                        cat <<EOF > .env
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
PORT=8000
NODE_ENV=production
EOF
                        chmod 600 .env
                        echo "✅ Environment file created"
                    '''
                }
            }
        }

        stage("Deploy using Docker Compose") {
            steps {
                sh '''
                    echo "🚀 Deploying application..."
                    
                    # Stop existing containers
                    docker compose down --remove-orphans || true
                    
                    # Start new containers
                    docker compose up -d
                    
                    # Wait for container to start
                    echo "⏳ Waiting for services to start..."
                    sleep 10
                    
                    # Show running services
                    echo "📊 Running services:"
                    docker compose ps
                    
                    # Show recent logs
                    echo "📝 Recent logs:"
                    docker compose logs --tail=20
                '''
            }
        }

        stage("Health Check") {
            steps {
                script {
                    echo "🏥 Performing health check..."
                    retry(5) {
                        sleep 5
                        sh '''
                            curl -f http://localhost:8000/health || \
                            curl -f http://localhost:8000/ || \
                            exit 1
                        '''
                    }
                    echo "✅ Application is healthy and responding"
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up sensitive files
                sh 'rm -f .env .trivyignore || true'
                
                // Clean up old Docker images (keep last 3 builds)
                sh """
                    echo "🧹 Cleaning up old images..."
                    docker images ${IMAGE_NAME} --format '{{.Tag}}' | \
                    grep -v latest | \
                    grep -E '^[0-9]+\$' | \
                    sort -rn | \
                    tail -n +4 | \
                    xargs -I {} docker rmi ${IMAGE_NAME}:{} 2>/dev/null || true
                """
            }
        }
        
        success {
            script {
                def serverIp = sh(
                    script: "hostname -I | awk '{print \$1}'",
                    returnStdout: true
                ).trim()
                
                echo """
                ✅ ==========================================
                ✅ Pipeline completed successfully!
                ✅ ==========================================
                
                🚀 Application Details:
                   - URL: http://${serverIp}:8000
                   - Container: devcanvas-app
                   - Image: ${LATEST_IMAGE}
                   - Build: #${BUILD_NUMBER}
                
                📊 Access your application:
                   - Local: http://localhost:8000
                   - Remote: http://${serverIp}:8000
                
                📝 View logs:
                   docker logs -f devcanvas-app
                
                ✅ ==========================================
                """
            }
        }
        
        failure {
            echo """
            ❌ ==========================================
            ❌ Pipeline Failed!
            ❌ ==========================================
            """
            
            sh '''
                echo "📝 Application logs (last 50 lines):"
                docker compose logs --tail=50 || true
                
                echo "🔄 Rolling back deployment..."
                docker compose down || true
            '''
        }
        
        unstable {
            echo "⚠️ Pipeline completed with warnings"
        }
        
        cleanup {
            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: '.scannerwork', type: 'INCLUDE'],
                    [pattern: 'trivy-*.txt', type: 'INCLUDE']
                ]
            )
        }
    }
}