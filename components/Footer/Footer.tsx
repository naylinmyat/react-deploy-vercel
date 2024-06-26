export default function Footer() {
  return (
    <footer className="w-full px-4 mx-auto xl:mt-16 max-w-container sm:px-6 lg:px-8">
      <div className="">
        <p className="mt-5 text-sm leading-6 text-center text-slate-500">
          © 2023 Myanmar Fonts Collection. All rights reserved.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="w-px h-4 bg-slate-500/20"></div>
          <a href="/terms-of-service">Terms and Conditions</a>
          <div className="w-px h-4 bg-slate-500/20"></div>
          <a href="https://www.facebook.com/profile.php?id=100093490448936&mibextid=ZbWKwL">FaceBook</a>
        </div>
      </div>
    </footer>
  );
}
