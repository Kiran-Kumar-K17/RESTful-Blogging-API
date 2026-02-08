pipeline {
    agent any

    environment {
        SONAR_HOME = tool "sonar"
        IMAGE_NAME = "devcanvas-app:latest"
    }
    

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        stage("Clone Code from GitHub") {
            steps {
                git url: "https://github.com/Kiran-Kumar-K17/RESTful-Blogging-API.git",
                    branch: "devops"
            }
        }

        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv("sonar") {
                    sh """
                      $SONAR_HOME/bin/sonar-scanner \
                      -Dsonar.projectName=devCanvas \
                      -Dsonar.projectKey=devCanvas
                    """
                }
            }
        }

        stage("Sonar Quality Gate") {
            steps {
                timeout(time: 2, unit: "MINUTES") {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage("OWASP Dependency Check") {
            steps {
                dependencyCheck odcInstallation: 'Owasp'
            }
        }

  stage("Trivy FS Scan - Frontend") {
    steps {
        sh '''
          trivy --config /dev/null fs frontend \
            --exit-code 1 \
            --severity HIGH,CRITICAL \
            --skip-dirs frontend/node_modules
        '''
    }
}

stage("Trivy FS Scan - Backend") {
    steps {
        sh '''
          trivy --config /dev/null fs backend \
            --exit-code 1 \
            --severity HIGH,CRITICAL \
            --skip-dirs backend/node_modules
        '''
    }
}



        stage("Build Docker Image") {
    steps {
        sh """
            docker system prune -f
            docker build --no-cache --pull -t $IMAGE_NAME .
        """
    }
}

        stage("Trivy Image Scan") {
            steps {
                sh '''
                  trivy --config /dev/null image \
                    --exit-code 1 \
                    --severity HIGH,CRITICAL \
                    restful-blogging-api:latest
                '''
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
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=$JWT_EXPIRES_IN
PORT=8000
EOF
                      chmod 600 .env
                    '''
                }
            }
        }

        stage("Deploy using Docker Compose") {
            steps {
                sh '''
                  docker compose down || true
                  docker compose up -d
                '''
            }
        }
    }

    post {
        always {
            sh 'rm -f .env || true'
        }
    }
}
