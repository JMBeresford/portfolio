import Link from 'next/link';

// custom pages/404.jsx !! Do not remove please or it will break build
export default function Error() {
  return (
    <>
      <h1>404 - Something went wrong</h1>
      <Link href='/'>
        <a>Click here to return</a>
      </Link>
    </>
  );
}
