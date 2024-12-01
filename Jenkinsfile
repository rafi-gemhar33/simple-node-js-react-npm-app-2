pipeline {
        agent {
            docker {
                image 'node:16-buster-slim'
                args '-p 3000:3000'
                args '--user root:root'
            }
        }
        triggers {
            githubPush()
        }
        stages {
            stage('Build react-app') {
                steps {
                    sh 'npm install'
                }
            }
            stage('Test') {
                steps {
                    sh 'chmod +rx ./jenkins/scripts/*.sh'
                    sh './jenkins/scripts/test.sh'
                }
            }
            stage('Manual Approval') { 
                steps {
                    sh './jenkins/scripts/deliver.sh' 
                    input message: 'Continue to Deploy? (Click "Proceed" to continue)'  
                }
            }
            stage('Deploy') { 
                steps {
                    sh './jenkins/scripts/deliver.sh' 
                    input message: 'proceed to kill the build'
                    sh './jenkins/scripts/kill.sh' 
                }
            }
        }
        post {
            always {
                script {
                    def emailBody = """
                        Job: ${env.JOB_NAME}
                        Build Number: ${env.BUILD_NUMBER}
                        Build URL: ${env.BUILD_URL}
                        Status: ${currentBuild.result ?: 'SUCCESS'}
                        
                        Check console output at: ${env.BUILD_URL}console
                    """
                    
                    emailext (
                        subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.result ?: 'SUCCESS'}",
                        body: emailBody,
                        to: 'gemhar.rafis@gmail.com',
                        from: 'gemhar.study@gmail.comm',
                        replyTo: ''
                    )
                }
            }
        }
    }