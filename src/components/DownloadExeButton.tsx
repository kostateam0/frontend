export default function DownloadExeButton() {
 return (
    <a
      href="/installer/troll-v1.exe"
      download="troll-v1.exe"
      className='h-8 my-2  w-full bg-[#1a1a1a] dark:bg-[#1a1a1a] flex items-center justify-center rounded-lg text-white hover:bg-[#3a4f31] transition-colors'
    >
      설치 파일 다운로드
    </a>
  );
}
