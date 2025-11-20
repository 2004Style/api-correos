module.exports = {
    apps: [
        {
            /**
             * Nombre de la aplicación en PM2
             */
            name: 'api-correos',

            /**
             * Script a ejecutar
             * Usa start.sh para compilar automáticamente antes de arrancar
             */
            script: 'start.sh',
            interpreter: 'bash',

            /**
             * Número de instancias a ejecutar
             * 'max' = número de CPUs disponibles
             * O un número específico (ej: 2)
             */
            instances: 1,

            /**
             * Modo de ejecución
             * 'cluster' = balanceo de carga entre instancias
             * 'fork' = ejecución simple (recomendado para esta aplicación)
             */
            exec_mode: 'fork',

            /**
             * Variables de entorno
             * Se cargan desde el archivo .env
             */
            env: {
                NODE_ENV: 'development',
            },

            /**
             * Variables de entorno para producción
             */
            env_production: {
                NODE_ENV: 'production',
            },

            /**
             * Opciones de reinicio automático
             */
            max_restarts: 10,
            min_uptime: '10s',

            /**
             * Logs
             */
            output: 'logs/pm2-out.log',
            error: 'logs/pm2-error.log',
            combine_logs: true,

            /**
             * Tiempo de espera antes de forzar la terminación (ms)
             */
            kill_timeout: 5000,

            /**
             * Tiempo de espera antes de considerarlo como crash (ms)
             */
            wait_ready: true,

            /**
             * Argumentos de la aplicación
             */
            args: '',

            /**
             * Variables de entorno adicionales
             */
            env_variables: {
                PORT: 3001,
            },

            /**
             * Configuración para producción en diferentes máquinas
             */
            host: '0.0.0.0', // Escucha en todas las interfaces de red
            port: 3001,

            /**
             * Monitoreo
             */
            max_memory_restart: '500M',

            /**
             * Watches de archivos para reinicio automático en desarrollo
             */
            watch: false, // Desactivado en producción
            ignore_watch: ['node_modules', 'dist', 'logs', '.git'],
            watch_delay: 1000,

            /**
             * Comandos a ejecutar después de actualizaciones o instalaciones
             * Útil para: compilación, migraciones, seed, etc.
             */
            post_update: ['pnpm install', 'pnpm run build', 'npx prisma migrate deploy'],
        },
    ],

    /**
     * Configuración de implementación
     * Descomenta y configura para desplegar en servidores remotos
     */
    deploy: {
        production: {
            user: 'node',
            host: '192.168.1.100', // Cambia a la IP de tu servidor
            ref: 'origin/main',
            repo: 'https://github.com/2004Style/api-correos.git',
            path: '/var/www/api-correos',
            'post-deploy': 'npm install && npm run build && pm2 restart ecosystem.config.js',
        },
    },
};
