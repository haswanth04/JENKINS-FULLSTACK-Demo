pipeline {
    agent any

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
                set TOMCAT_DIR=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactapp

                if exist "%TOMCAT_DIR%" (
                    rmdir /S /Q "%TOMCAT_DIR%"
                )
                mkdir "%TOMCAT_DIR%"
                xcopy /E /I /Y task-manager\\dist\\* "%TOMCAT_DIR%\\"
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
                set TOMCAT_DIR=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps

                if exist "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT.war" (
                    del /F /Q "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT.war"
                )
                if exist "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT" (
                    rmdir /S /Q "%TOMCAT_DIR%\\TaskManager-0.0.1-SNAPSHOT"
                )

                copy TaskManager\\target\\*.war "%TOMCAT_DIR%\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
