// pages/Index.tsx
import React, { useState } from "react";
import SummonerSearch from "../components/SummonerSearch";
import SummonerInfo from "./SummonerInfo"; 
import Header from "@/components/Header";

const Index = () => {
  const [activeView, setActiveView] = useState<"feed" | "search">("feed");

  const [searchQuery, setSearchQuery] = useState<{
    region: string;
    summonerName: string;
    tag: string;
  } | null>(null);

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] text-[#111827]">
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 영역 */}
      <div
        className="flex-1 flex overflow-hidden"
        onWheel={(e) => {
          const content = document.getElementById("scrollable-main");
          if (content) content.scrollTop += e.deltaY;
        }}
      >
        {/* 좌측 사이드바 */}
        <aside className="hidden md:flex flex-col w-60 p-4 border-r border-gray-200 bg-white text-sm select-none cursor-default">
          <ul className="space-y-4">
            <li className="text-[#6366f1] cursor-pointer" onClick={() => {
              setActiveView("feed");
              setSearchQuery(null);
            }}>
              🏠 홈
            </li>
            <li className="text-[#6366f1] cursor-pointer" onClick={() => {
              setActiveView("search");
              setSearchQuery(null);
            }}>
              🔍 전적 검색
            </li>
            <li className="text-[#6366f1]">🎮 eSports</li>
            <li className="text-[#6366f1]">💸 베팅</li>
            <li className="text-[#6366f1]">⚔️ 막고라</li>
            <li className="text-[#6366f1]">⚔️ 마이페이지</li>
          </ul>
        </aside>

        {/* 중앙 콘텐츠 */}
        <main
          id="scrollable-main"
          className="flex-1 pt-4 pb-24 md:pb-4 px-4 md:px-8 bg-[#fafafa] overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            {activeView === "feed" && (
              <>
                {/* 피드 컴포넌트 */}
                <div className="mb-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm">
                    <div className="text-sm text-gray-500">다음 경기</div>
                    <div className="font-semibold text-[#111827] mt-1">T1 vs Gen.G - 오늘 오후 7시</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-gray-500">🎯 베팅 이벤트</div>
                    <div className="font-semibold text-[#7c3aed] mt-1">승부 예측하고 보상 받기</div>
                  </div>
                </div>
                <div className="text-lg font-semibold mb-4 text-[#111827]">커뮤니티 피드</div>
                <div className="space-y-4">
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="font-semibold text-[#7c3aed]">유저 #{idx + 1}</div>
                      <p className="text-[14px] mt-1 text-[#374151]">
                        여기는 유저가 올린 커뮤니티 피드 내용이 들어갑니다.
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeView === "search" && (
              searchQuery ? (
                <SummonerInfo
                  region={searchQuery.region}
                  summonerName={searchQuery.summonerName}
                  tag={searchQuery.tag}
                />
              ) : (
                <SummonerSearch onSearch={setSearchQuery} />
              )
            )}
          </div>
        </main>

        {/* 우측 사이드바 */}
        <aside className="hidden md:block w-80 p-4 bg-white border-l border-gray-200 text-sm select-none cursor-default">
          <div className="text-lg font-bold mb-4 text-[#7c3aed]">eSports 경기 정보</div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200">
                <div className="text-sm text-gray-500">6월 20일 | LCK</div>
                <div className="font-semibold mt-1 text-[#111827]">T1 vs Gen.G</div>
                <div className="text-sm mt-1 text-gray-500">오후 7시 시작</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <aside className="fixed bottom-0 md:hidden w-full p-3 border-t border-gray-200 bg-white flex justify-around items-center text-[18px] z-30">
        <button onClick={() => {
          setActiveView("feed");
          setSearchQuery(null);
        }}>🏠</button>
        <button onClick={() => {
          setActiveView("search");
          setSearchQuery(null);
        }}>🔍</button>
        <button>🎮</button>
        <button>💸</button>
        <button>⚔️</button>
        <button>⚔️</button>
      </aside>
    </div>
  );
};

export default Index;
