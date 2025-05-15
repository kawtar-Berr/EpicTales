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

        +   stage('CI Test Output') {
       steps {
           // Affiche dans la console Jenkins le contenu de ci-test.txt
           sh 'cat ci-test.txt'
        }    
        }
       }
        stage('Run frontend tests') {
            steps { dir('epictales-frontend') { sh 'npm test' } }
        }
        stage('Build Docker image') {
            steps {
                script {
                    def image = docker.build("epictales:${env.BUILD_ID}", "-f Dockerfile .")
                    image.push()
                }
            }
        }   
    }

    post {
        success { echo '✅ Build succeeded!' }
        failure { echo '❌ Build failed.' }
    }
}
