pipeline {
    agent {
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000 --user root:root'
        }
    }
    
    environment {
        DOCKER_IMAGE = "gemharrafi/react-app:${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = credentials('docker-cred')
    }
    
    stages {
        stage('Build react-app') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            agent {
                docker {
                    image 'node:16-buster-slim'
                    args '--user root:root'
                }
            }
            steps {
                sh 'chmod +rx ./jenkins/scripts/*.sh'
                sh './jenkins/scripts/test.sh'
            }
        }
        
        stage('Static Code Analysis') {
            environment {
                SONAR_URL = "http://localhost:9000"
            }
            steps {
                withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_AUTH_TOKEN')]) {
                    sh 'npm install sonar-scanner'
                    // sh """
                    //     npx sonar-scanner \
                    //     -Dsonar.projectKey=react-app \
                    //     -Dsonar.sources=. \
                    //     -Dsonar.host.url=\${SONAR_URL} \
                    //     -Dsonar.login=\${SONAR_AUTH_TOKEN}
                    // """
                    echo 'skipping Static Code Analysis.... due to permission error'
                }
            }
        }
        
        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                    docker.withRegistry('https://index.docker.io/v1/', "docker-cred") {
                        sh 'docker push ${DOCKER_IMAGE}'
                    }
                }
            }
        }
        
        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "simple-node-js-react-npm-app-2"
                GIT_USER_NAME = "rafi-gemhar33"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.email "gemhar.rafis@gmail.com"
                        git config user.name "rafi-gemhar33"
                        BUILD_NUMBER=${BUILD_NUMBER}
                        sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" kubernetes/deployment.yml
                        git add kubernetes/deployment.yml
                        git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:argo-cd
                    '''
                }
            }
        }
    }
    
    post {
        always {
            mail (
                to: 'gemhar.rafis@gmail.com',
                subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.result}",
                body: """
                    Build Status: ${currentBuild.result}
                    Build Number: ${env.BUILD_NUMBER}
                    Build URL: ${env.BUILD_URL}
                    
                    Check console output at: ${env.BUILD_URL}console
                """
            )
        }
    }
}