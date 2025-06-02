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
        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t petadoption-frontend ./Client'
            }
        }
        stage('Start Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}