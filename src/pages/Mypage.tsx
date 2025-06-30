import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import SummonerProfile from "@/components/SummonerProfile";
import SummonerRankTier from "@/components/SummonerRankTier";
import SummonerChampMastery from "@/components/SummonerChampMastery";
import { Separator } from "@/components/ui/separator";

const Mypage = () => {
  const { user, isLoggedIn, accessToken, setUser, logout } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  const handleAccountDelete = async () => {
    if (!confirm("정말로 탈퇴하시겠습니까?")) return;
    try {
      const res = await fetch("http://localhost:4000/authkit/user/delete", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("탈퇴 실패");
      alert("회원 탈퇴가 완료되었습니다.");
      logout();
      window.location.href = "/login";
    } catch (err) {
      alert("오류가 발생했습니다.");
      console.error(err);
    }
  };

  const handleSaveName = async () => {
    try {
      const res = await fetch("http://localhost:4000/authkit/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ name: editedName }),
      });
      if (!res.ok) throw new Error("수정 실패");
      if (user) setUser({ ...user, name: editedName }, accessToken!);
      setIsEditing(false);
    } catch (err) {
      alert("수정 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  if (!isLoggedIn || !user)
    return (
      <div className="text-center mt-10 text-red-500">
        로그인 정보가 없습니다. <a href="/login" className="underline">로그인</a>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fff7b1] flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-[30px] border-4 border-black flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* 왼쪽 이미지 영역 */}
        <div className="w-full md:w-1/2 p-6 bg-[#eee] border-r-4 border-black flex justify-center items-center">
          <img src="/assets/troll.png" alt="Troll" className="w-60 h-auto" />
        </div>

        {/* 오른쪽 정보 영역 */}
        <div className="w-full md:w-1/2 p-10 space-y-6 text-black">
          <h2 className="text-3xl font-extrabold text-center">트롤 마이페이지</h2>

          <div className="space-y-2 text-center text-lg">
            <p>
              <strong>이름:</strong>{" "}
              {isEditing ? (
                <>
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border px-2 py-1 rounded ml-2"
                  />
                  <button onClick={handleSaveName} className="ml-2 text-blue-500">
                    저장
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="ml-1 text-gray-500"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {user.name}
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditedName(user.name);
                    }}
                    className="ml-2 text-sm text-blue-500 underline"
                  >
                    수정
                  </button>
                </>
              )}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={handleAccountDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full border-2 border-black transition"
            >
              회원 탈퇴
            </button>
          </div>

          <Separator className="my-4" />

          {user.rsoAccount ? (
            <>
              <SummonerProfile
                summoner={{
                  name: user.rsoAccount.gameName,
                  profileIconId: user.rsoAccount.profileIconId,
                  summonerLevel: user.rsoAccount.summonerLevel,
                  revisionDate: Date.now(),
                }}
                summonerName={user.rsoAccount.gameName}
                tag={user.rsoAccount.tagLine}
              />
              <SummonerRankTier puuid={user.rsoAccount.puuid} />
              <SummonerChampMastery
                puuid={user.rsoAccount.puuid}
                summonerName={user.rsoAccount.gameName}
              />
            </>
          ) : (
            <div className="text-center text-sm text-gray-600">
              Riot 계정이 아직 바인딩되지 않았습니다.
              <br />
              <button
                onClick={() => {
                  window.location.href = `https://auth.riotgames.com/authorize?...`;
                }}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Riot 계정 연결하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
