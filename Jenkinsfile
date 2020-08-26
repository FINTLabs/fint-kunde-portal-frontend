pipeline {
    agent { label 'docker' }
    stages {
        stage('Build') {
            steps {
                sh "docker build --tag ${GIT_COMMIT} ."
            }
        }
        stage('Publish') {
            when { branch 'master' }
            steps {
                withDockerRegistry([credentialsId: 'fintlabs.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/kunde-portal-frontend:latest"
                    sh "docker push fintlabsacr.azurecr.io/kunde-portal-frontend:latest"
                }
            }
        }
        stage('Build backend') {
            when { branch 'master' }
            steps {
                build job: 'FINTLabs/fint-kunde-portal-backend/master', wait: false
            }
        }
        stage('Publish PR') {
            when { changeRequest() }
            steps {
                withDockerRegistry([credentialsId: 'fintlabs.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
                    sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/kunde-portal-frontend:${BRANCH_NAME}"
                    sh "docker push fintlabsacr.azurecr.io/kunde-portal-frontend:${BRANCH_NAME}"
                }
            }
        }
    }
}
