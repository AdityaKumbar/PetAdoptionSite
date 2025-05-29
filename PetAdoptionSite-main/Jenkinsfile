pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/AdityaKumbar/PetAdoptionSite.git'
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t petadoption-backend ./server'
            }
        }
        stage('Start Backend Container') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}