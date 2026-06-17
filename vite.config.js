import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load process.env variables from the .env files
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      open: true
    },
    plugins: [
      react(),
      {
        name: 'mux-assets-api-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            // Intercept only our API route
            if (req.url === '/api/assets') {
              const tokenId = env.MUX_TOKEN_ID;
              const tokenSecret = env.MUX_TOKEN_SECRET;

              if (!tokenId || !tokenSecret || tokenId === 'your_mux_token_id_here') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing MUX_TOKEN_ID or MUX_TOKEN_SECRET in .env' }));
                return;
              }

              try {
                // Fetch assets list from Mux API
                const auth = Buffer.from(`${tokenId}:${tokenSecret}`).toString('base64');
                const apiResponse = await fetch('https://api.mux.com/video/v1/assets', {
                  method: 'GET',
                  headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                  }
                });

                if (!apiResponse.ok) {
                  const errorText = await apiResponse.text();
                  res.writeHead(apiResponse.status, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Mux API error', details: errorText }));
                  return;
                }

                const data = await apiResponse.json();
                
                // Return assets list to client
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            } else {
              // Pass through to other Vite middlewares
              next();
            }
          });
        }
      }
    ]
  };
});
