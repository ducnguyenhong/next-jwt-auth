/** @type {import('next').NextConfig} */

const getENV = () => {
  const currentENV = process.env.ENV || 'development';

  const ALL_ENV = {
    local: {
      NEXT_PUBLIC_DOMAIN: 'http://localhost:1234',
      NEXT_PUBLIC_IVND: 'https://id-uat.ivnd.com.vn',
      NEXT_PUBLIC_IVND_KEY: 'kms-local',
      NEXT_API_ACCOUNT_IVND: 'https://id-uat.ivnd.com.vn',
      NEXT_API_DOMAIN_BACKEND: 'http://10.210.39.198:3100'
    },
    uat: {
      NEXT_PUBLIC_DOMAIN: 'https://uat-kms.vndirect.com.vn',
      NEXT_PUBLIC_IVND: 'https://id-uat.ivnd.com.vn',
      NEXT_PUBLIC_IVND_KEY: 'kms',
      NEXT_API_ACCOUNT_IVND: 'https://id-uat.ivnd.com.vn',
      NEXT_API_DOMAIN_BACKEND: 'http://10.210.39.198:3100'
    },
    prod: {
      NEXT_PUBLIC_DOMAIN: 'https://kms.ivnd.com.vn',
      NEXT_PUBLIC_IVND: 'https://id.ivnd.com.vn',
      NEXT_PUBLIC_IVND_KEY: 'kms',
      NEXT_API_ACCOUNT_IVND: 'https://id.ivnd.com.vn',
      NEXT_API_DOMAIN_BACKEND: 'https://kms-api.ivnd.com.vn'
    }
  };

  return ALL_ENV[currentENV];
};

const nextConfig = {
  env: getENV(),

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
