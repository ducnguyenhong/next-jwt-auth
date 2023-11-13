import { APIServer } from '@/utils/api-server';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization') || '';
    const token = authorization.replace('Bearer ', '');

    const res = await APIServer.request({
      url: '/ivnd/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = NextResponse.json(res, { status: 200 });

    const { exp } = jwtDecode(token);

    // Then set a cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      expires: new Date(exp || 0)
    });

    return response;
  } catch (error: any) {
    console.log('Server error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
