pipeline {
    agent any

    environment {
        SONAR_HOME = tool "Sonar"
    }

    stages {

        stage("Clone Code from GitHub") {
            steps {
                git url: "https://github.com/Kiran-Kumar-K17/RESTful-Blogging-API.git",
                    branch: "devops"
            }
        }

        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv("Sonar") {
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
                dependencyCheck odcInstallation: 'dc'
            }
        }

        stage("Trivy File System Scan") {
            steps {
                sh '''
                  trivy --config /dev/null fs \
                    --exit-code 1 \
                    --severity HIGH,CRITICAL \
                    .
                '''
            }
        }

        stage("Deploy using Docker Compose") {
            steps {
                sh "docker compose up -d"
            }
        }
    }
}
