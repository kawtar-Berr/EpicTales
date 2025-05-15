pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Install frontend deps') {
            steps {
                dir('epictales-frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build frontend') {
            steps {
                dir('epictales-frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Install backend deps') {
            steps {
                dir('epictales-backend') {
                    bat 'composer install'
                    bat 'php artisan config:clear'
                    bat 'php artisan route:clear'
                }
            }
        }

        stage('Run Laravel tests') {
            steps {
                dir('epictales-backend') {
                    bat 'vendor\\bin\\phpunit'
                }
            }
        }
    } // fin stages

    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
