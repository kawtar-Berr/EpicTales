pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Install frontend deps') {
            steps { dir('epictales-frontend') { sh 'npm install' } }
        }
        stage('Build frontend') {
            steps { dir('epictales-frontend') { sh 'npm run build' } }
        }
        stage('Install backend deps') {
            steps {
                dir('epictales-backend') {
                    sh 'composer install'
                    sh 'php artisan config:clear'
                    sh 'php artisan route:clear'
                }
            }
        }
        stage('Run Laravel tests') {
            steps { dir('epictales-backend') { sh './vendor/bin/phpunit' } }
        }
    }

    post {
        success { echo '✅ Build succeeded!' }
        failure { echo '❌ Build failed.' }
    }
}
