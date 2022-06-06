import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

import banner from "@/test/test_banner.png";

const Main = function () {
  return (
    <div className="container">
      <AuthGroup />
      <Banner image={ banner } name="終究還是因為愛 (REMIX)" artist="李浩瑋, PIZZALI, 陳忻玥,G5SH" />
      <PreviewList title="最新專輯" link="/" />
      <PreviewList title="推薦歌單" link="/" />
    </div>
  )
}

export default Main;