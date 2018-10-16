pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Build') {
            steps {
                sh "docker build -t ${GIT_COMMIT} ."
            }
        }
        stage('Publish') {
            when { branch 'master' }
            steps {
                withDockerRegistry([credentialsId: 'dtr-fintlabs-no', url: 'https://dtr.fintlabs.no']) {
                    sh "docker tag ${GIT_COMMIT} dtr.fintlabs.no/beta/kunde-portal-frontend:latest"
                    sh "docker push dtr.fintlabs.no/beta/kunde-portal-frontend:latest"
                }
            }
        }
        /*
        stage('Build backend') {
            when { branch 'master' }
            steps {
                build 'FINTprosjektet/fint-betaling/master'
            }
        }
        */
    }
}