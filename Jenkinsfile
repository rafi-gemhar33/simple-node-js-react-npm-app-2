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
            success {
                emailext (
                    subject: "Pipeline Success: ${currentBuild.fullDisplayName}",
                    body: """
                        Build succeeded!
                        
                        Build URL: ${env.BUILD_URL}
                        Project: ${env.JOB_NAME}
                        Build Number: ${env.BUILD_NUMBER}
                        """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                    to: 'gemhar.rafis@gmail.com'
                )
            }
            failure {
                emailext (
                    subject: "Pipeline Failed: ${currentBuild.fullDisplayName}",
                    body: """
                        Build failed!
                        
                        Build URL: ${env.BUILD_URL}
                        Project: ${env.JOB_NAME}
                        Build Number: ${env.BUILD_NUMBER}
                        
                        Check console output at ${env.BUILD_URL}console
                        """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                    to: 'gemhar.rafis@gmail.com'
                )
            }
        }
    }