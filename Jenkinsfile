pipeline {
    agent any

    environment {
        TOMCAT_DIR = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps'
    }

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('task-manager') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "%TOMCAT_DIR%\\reactapp" (
                    rmdir /S /Q "%TOMCAT_DIR%\\reactapp"
                )
                mkdir "%TOMCAT_DIR%\\reactapp"
                xcopy /E /I /Y task-manager\\dist\\* "%TOMCAT_DIR%\\reactapp"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('TaskManager') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT.war" (
                    del /F /Q "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT.war"
                )
                if exist "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT" (
                    rmdir /S /Q "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT"
                )
                copy "TaskManager\\target\\*.war" "%TOMCAT_DIR%\\"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Task Manager Deployment Successful!'
        }
        failure {
            echo '❌ Task Manager Pipeline Failed.'
        }
    }
}
