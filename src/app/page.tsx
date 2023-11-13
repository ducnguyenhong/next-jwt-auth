import { APIClient } from '@/utils/api-client';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//   // read route params
//   const id = params.id;

//   // fetch data
//   // const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: 'Home1',
//     openGraph: {
//       // images: ['/some-specific-page-image.jpg', ...previousImages],
//     }
//   };
// }

export default async function Home({ searchParams }: Props) {
  const { token: tokenFromUrl = '' } = searchParams;
  // const token = typeof tokenFromUrl === 'string' ? tokenFromUrl : tokenFromUrl[0];
  const token =
    'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJzdWIiOiJzdWJqZWN0IiwiYXVkIjpbImF1ZGllbmNlIiwiaW9zIiwib25saW5lIiwidHJhZGVhcGkiLCJhdXRoIl0sImV4cCI6MTY5OTg3MTY1NCwibmJmIjoxNjk5ODQyNzk0LCJpYXQiOjE2OTk4NDI4NTQsImFsbG93U2hhcmluZ1Byb2ZpbGUiOiIiLCJyb2xlcyI6IltdIiwiYWNjb3VudFR5cGUiOm51bGwsInZfdXNlcklkIjoiMjMxNDQxMDU3Mjc4MjYyNCIsInVzZXJJZCI6Im51bGwiLCJ2ZXJzaW9uIjoiVjIiLCJjdXN0b21lck5hbWUiOiJIT8OATkcgQU5IIERVWcOKTiIsInRyYWRpbmdFeHAiOjAsImlkZ0lkIjpudWxsLCJwaG9uZSI6bnVsbCwiY3VzdG9tZXJJZCI6bnVsbCwicmV0aXJlZEFjY291bnRzIjpudWxsLCJ1c2VyVHlwZSI6bnVsbCwiZW1haWwiOiJhMWFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhMWFAZ21haWwuY29tIiwic3RhdHVzIjoiTm90IHVzZWQifQ.HQ0R-_c8maQQWA-5Ga4thMtOoMCKIRQnWp6AH_E6YvF3P56gMK9IZH-qOQymN7NkMvfiizTsBFy0hS195UhRj4sjuAZGWOLA84PVf21EFqlpguZtybKAaz4DIlvuDqsD4HDsR8875viFbhCn9F4vG-c3rFcMjSxXLOXjYziycIZFZiABUOJhfwYZWSmEmHws6Ml-FEc2phsFLDsRn3lHqqbqZckg4wtL6p3kiw8BuJIXM9b62I4Xs4AOM72KZYIK2Qh25L409n7sRSnzyCSSkStFf_FOKtcjLYofZK93Uozt1PczhWdZqmEFv-5W3sCW7NgRagw8AphHM3t920J4uQ';

  // const router = useRouter();
  // const { token: tokenFromUrl = '' } = router.query;
  // const token = typeof tokenFromUrl === 'string' ? tokenFromUrl : tokenFromUrl[0];
  // const setUserInfo = useSetRecoilState(userInfoState);
  // const logout = useLogout();

  // async function create(formData: FormData) {
  //   'use server';
  //   console.log('ducnh99');

  //   cookies().set(CK_TOKEN_KEY, token);
  // }

  // if (token) {
  //   console.log('ducnh token2', token);
  //   cookies().set(CK_TOKEN_KEY, token);
  // }

  const response = await APIClient.request({
    url: '/api/user-info',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    redirect('/dang-nhap');
  }

  if (response.status < 200 || response.status >= 400) {
    const text = await response.text();
    throw new Error(`Failed to fetch user profile: ${text}`);
  }

  const userInfo = await response.json();

  // useEffect(() => {
  //   if (token) {
  //     Cookies.set(CK_TOKEN_KEY, token);
  //     APIClient.request({
  //       url: '/api/user-info',
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //       .then((response) => {
  //         if (isEmpty(response)) {
  //           logout();
  //           return;
  //         }
  //         const { username, fullName, userId } = response;
  //         setUserInfo({ username, fullName, userId });
  //         router.replace('/', undefined, { shallow: true });
  //       })
  //       .catch((error) => {
  //         logout();
  //       });
  //   }
  // }, [logout, router, setUserInfo, token]);

  return <main>{userInfo?.fullName}</main>;
}
