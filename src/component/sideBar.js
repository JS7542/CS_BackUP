import "../css/sidebar.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const SideBar = (props) => {
  const [CategoryData, setCategoryData] = useState([]);
  const [wallpaperCategoryData, setwallpaperCategoryData] = useState([]);
  const [floorimagesURL, setfloorimagesURL] = useState({});
  const [wallpaperimagesURL, setwallpaperimagesURL] = useState({});
  const [floorCategoryData, setfloorCategoryData] = useState([]);
  const [tileCategoryData, settileCategoryData] = useState([]);
  const [tileURL, setTileURL] = useState([]);

  const [iswallpaperfilter, setiswallpaperfilter] = useState(false);
  const [filterWallpaper1, setfilterWallpaper1] = useState("");
  const [filterWallpaper2, setfilterWallpaper2] = useState("");
  const [filterWallpaper3, setfilterWallpaper3] = useState("");

  const [isfloorfilter, setisfloorfilter] = useState(false);
  const [filterfloor1, setfilterfloor1] = useState("");
  const [filterfloor2, setfilterfloor2] = useState("");
  const [filterfloor3, setfilterfloor3] = useState("");

  const [istilefilter, setistilefilter] = useState(false);
  const [filtertile1, setfiltertile1] = useState("");
  const [filtertile2, setfiltertile2] = useState("");
  const [requestCount, setRequestCount] = useState(0);

  const callAPI = useCallback(async () => {
    if (requestCount < 3) {
      try {
        const response = await axios.get("/api/check");
        setCategoryData(response.data);
        setRequestCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }
  }, [requestCount]);

  const callphoto = useCallback(async () => {
    setwallpaperCategoryData(
      CategoryData.filter((item) => item.type === "wallpaper")
    );
    setfloorCategoryData(CategoryData.filter((item) => item.type === "floor"));
    settileCategoryData(CategoryData.filter((item) => item.type === "tile"));

    const fetchImages = async (madeurl) => {
      let attempts = 0;
      while (attempts < 3) {
        try {
          const response = await axios.get(madeurl);
          return response.data;
        } catch (error) {
          attempts++;
          if (attempts === 3) {
            console.error("Error fetching images after 3 attempts:", error);
            throw error; // 3번 시도 후 에러를 던짐
          }
        }
      }
    };

    try {
      if (CategoryData) {
        const url = "/api/images/?fileNames=";

        const floorData = CategoryData.filter((item) => item.type === "floor");
        const floorimageslist = floorData.map((item) => item.filename);
        const madeurl = url + floorimageslist.join(",");
        const floorImagesData = await fetchImages(madeurl);
        setfloorimagesURL(floorImagesData);
        const makeJSON = floorimageslist.reduce((acc, curr, index) => {
          acc[curr] = floorImagesData[index];
          return acc;
        }, {});
        setfloorimagesURL(makeJSON);

        const wallpaperData = CategoryData.filter(
          (item) => item.type === "wallpaper"
        );
        const wallpaperimageslist = wallpaperData.map((item) => item.filename);
        const madeurlwallpaper = url + wallpaperimageslist.join(",");
        const wallpaperImagesData = await fetchImages(madeurlwallpaper);
        setwallpaperimagesURL(wallpaperImagesData);
        const makeJSONwallpaper = wallpaperimageslist.reduce(
          (acc, curr, index) => {
            acc[curr] = wallpaperImagesData[index];
            return acc;
          },
          {}
        );
        setwallpaperimagesURL(makeJSONwallpaper);

        const tileData = CategoryData.filter((item) => item.type === "tile");
        const tileimageslist = tileData.map((item) => item.filename);
        const madeurl1 = url + tileimageslist.join(",");
        const tileImagesData = await fetchImages(madeurl1);
        setTileURL(tileImagesData);
        const makeJSON1 = tileimageslist.reduce((acc, curr, index) => {
          acc[curr] = tileImagesData[index];
          return acc;
        }, {});
        setTileURL(makeJSON1);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [
    CategoryData,
    setwallpaperCategoryData,
    setfloorCategoryData,
    setfloorimagesURL,
    setwallpaperimagesURL,
    setTileURL,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await callAPI();
      await callphoto();
    };

    fetchData();
  }, [callAPI, callphoto]);

  const setSelect = (item) => {
    props.getName(item.filename);
    props.getCost(item.cost);
  };

  const Slide = (e) => {
    const this_div = e.currentTarget.parentElement;
    const check_toggle = this_div.children[1];
    const indexWrapper = this_div.children[2].children[0];
    const ul_toggle = this_div.children[2].children[1];
    if (check_toggle.checked === false) {
      ul_toggle.style.height = "30vh";
      ul_toggle.style.padding = "1vh 0 0 0.5vw";
      indexWrapper.style.height = "2vh";
      check_toggle.checked = true;
    } else {
      ul_toggle.style.height = 0;
      ul_toggle.style.padding = 0;
      indexWrapper.style.height = 0;
      check_toggle.checked = false;
    }
  };

  const Filterwallpaper = (e) => {
    const Checkbox = e.currentTarget;
    const isCheck = Checkbox.checked;
    if (!isCheck) {
      switch (Checkbox.value) {
        case "실크":
          if (filterWallpaper2 === "" && filterWallpaper3 === "") {
            setiswallpaperfilter(false);
          }
          break;
        case "방염":
          if (filterWallpaper1 === "" && filterWallpaper3 === "") {
            setiswallpaperfilter(false);
          }
          break;
        case "합지":
          if (filterWallpaper1 === "" && filterWallpaper2 === "") {
            setiswallpaperfilter(false);
          }
          break;
        default:
          setiswallpaperfilter(false);
          break;
      }
      if (
        filterWallpaper1 === "" &&
        filterWallpaper2 === "" &&
        filterWallpaper3 === ""
      ) {
        setiswallpaperfilter(false);
      }
    } else {
      setiswallpaperfilter(true);
    }
  };

  const Filtertile = (e) => {
    const Checkbox = e.currentTarget;
    const isCheck = Checkbox.checked;
    if (!isCheck) {
      switch (Checkbox.value) {
        case "벽타일":
          if (filtertile2 === "") {
            setistilefilter(false);
          }
          break;
        case "바닥타일":
          if (filtertile1 === "") {
            setistilefilter(false);
          }
          break;
        default:
          setistilefilter(false);
          break;
      }
      if (filtertile1 === "" && filtertile2 === "") {
        setistilefilter(false);
      }
    } else {
      setistilefilter(true);
    }
  };

  const Filterfloor = (e) => {
    const Checkbox = e.currentTarget;
    const isCheck = Checkbox.checked;
    if (!isCheck) {
      switch (Checkbox.value) {
        case "강마루":
          if (filterfloor2 === "" && filterfloor3 === "") {
            setisfloorfilter(false);
          }
          break;
        case "시트":
          if (filterfloor1 === "" && filterfloor3 === "") {
            setisfloorfilter(false);
          }
          break;
        case "원목마루":
          if (filterfloor1 === "" && filterfloor2 === "") {
            setisfloorfilter(false);
          }
          break;
        default:
          setisfloorfilter(false);
          break;
      }
      if (filterfloor1 === "" && filterfloor2 === "" && filterfloor3 === "") {
        setisfloorfilter(false);
      }
    } else {
      setisfloorfilter(true);
    }
  };

  return (
    <div className="Wrapper">
      <div>
        <h1
          onClick={(e) => {
            Slide(e);
          }}
        >
          벽지
        </h1>
        <input type="checkbox" className="check"></input>
        <div>
          <div className="indexWrapper">
            <input
              type="checkbox"
              id="wallpaper1"
              value="실크"
              onChange={(e) => {
                filterWallpaper1
                  ? setfilterWallpaper1("")
                  : setfilterWallpaper1("실크");
                Filterwallpaper(e);
              }}
            ></input>
            <label for="wallpaper1">
              <span>실크</span>
            </label>
            <input
              type="checkbox"
              id="wallpaper2"
              value="방염"
              onChange={(e) => {
                filterWallpaper2
                  ? setfilterWallpaper2("")
                  : setfilterWallpaper2("방염");
                Filterwallpaper(e);
              }}
            ></input>
            <label for="wallpaper2">
              <span>방염</span>
            </label>
            <input
              type="checkbox"
              id="wallpaper3"
              value="합지"
              onChange={(e) => {
                filterWallpaper3
                  ? setfilterWallpaper3("")
                  : setfilterWallpaper3("합지");
                Filterwallpaper(e);
              }}
            ></input>
            <label for="wallpaper3">
              <span>합지</span>
            </label>
          </div>
          <ul className="category1">
            {iswallpaperfilter
              ? wallpaperCategoryData &&
                wallpaperCategoryData
                  .filter(
                    (item) =>
                      item.category === filterWallpaper1 ||
                      item.category === filterWallpaper2 ||
                      item.category === filterWallpaper3
                  )
                  .map((item, index) => (
                    <div
                      className="div_inUl"
                      onClick={() => {
                        setSelect(item);
                      }}
                      key={item.filename}
                    >
                      <img
                        src={wallpaperimagesURL[item.filename]}
                        alt="element"
                        onClick={() => {
                          console.log(item.filename);
                        }}
                      ></img>
                      {item.name}
                    </div>
                  ))
              : wallpaperCategoryData &&
                wallpaperCategoryData.map((item, index) => (
                  <div
                    className="div_inUl"
                    onClick={() => {
                      setSelect(item);
                    }}
                    key={index}
                  >
                    <img
                      src={wallpaperimagesURL[item.filename]}
                      alt="element"
                    ></img>
                    {item.name}
                  </div>
                ))}
          </ul>
        </div>
      </div>
      <div>
        <h1
          onClick={(e) => {
            Slide(e);
          }}
        >
          바닥재
        </h1>
        <input type="checkbox" className="check"></input>
        <div>
          <div className="indexWrapper">
            <input
              type="checkbox"
              id="floor1"
              value="강마루"
              onChange={(e) => {
                filterfloor1 ? setfilterfloor1("") : setfilterfloor1("강마루");
                Filterfloor(e);
              }}
            ></input>
            <label for="floor1">
              <span>강마루</span>
            </label>
            <input
              type="checkbox"
              id="floor2"
              value="시트"
              onChange={(e) => {
                filterfloor2 ? setfilterfloor2("") : setfilterfloor2("시트");
                Filterfloor(e);
              }}
            ></input>
            <label for="floor2">
              <span>시트</span>
            </label>
            <input
              type="checkbox"
              id="floor3"
              value="원목마루"
              onChange={(e) => {
                filterfloor3
                  ? setfilterfloor3("")
                  : setfilterfloor3("원목마루");
                Filterfloor(e);
              }}
            ></input>
            <label for="floor3">
              <span>원목마루</span>
            </label>
          </div>
          <ul className="category1">
            {isfloorfilter
              ? floorCategoryData
                  .filter(
                    (item) =>
                      item.category === filterfloor1 ||
                      item.category === filterfloor2 ||
                      item.category === filterfloor3
                  )
                  .map((item, index) => (
                    <div
                      className="div_inUl"
                      onClick={() => {
                        setSelect(item);
                      }}
                      key={item.filename}
                    >
                      <img
                        src={floorimagesURL[item.filename]}
                        alt="element"
                      ></img>
                      {item.name}
                    </div>
                  ))
              : floorCategoryData.map((item, index) => (
                  <div
                    className="div_inUl"
                    onClick={() => {
                      setSelect(item);
                    }}
                    key={index}
                  >
                    <img
                      src={floorimagesURL[item.filename]}
                      alt="element"
                    ></img>
                    {item.name}
                  </div>
                ))}
          </ul>
        </div>
      </div>
      <div>
        <h1
          onClick={(e) => {
            Slide(e);
          }}
        >
          타일
        </h1>
        <input type="checkbox" className="check"></input>
        <div>
          <div className="indexWrapper">
            <input
              type="checkbox"
              id="tile1"
              value="벽타일"
              onChange={(e) => {
                filtertile1 ? setfiltertile1("") : setfiltertile1("벽타일");
                Filtertile(e);
              }}
            ></input>
            <label for="tile1">
              <span>벽타일</span>
            </label>
            <input
              type="checkbox"
              id="tile2"
              value="바닥타일"
              onChange={(e) => {
                filtertile2 ? setfiltertile2("") : setfiltertile2("바닥타일");
                Filtertile(e);
              }}
            ></input>
            <label for="tile2">
              <span>바닥타일</span>
            </label>
          </div>
          <ul className="category1">
            {istilefilter
              ? tileCategoryData
                  .filter(
                    (item) =>
                      item.category === filtertile1 ||
                      item.category === filtertile2
                  )
                  .map((item, index) => (
                    <div
                      className="div_inUl"
                      onClick={() => {
                        setSelect(item);
                      }}
                      key={item.filename}
                    >
                      <img src={tileURL[item.filename]} alt="element"></img>
                      {item.name}
                    </div>
                  ))
              : tileCategoryData.map((item, index) => (
                  <div
                    className="div_inUl"
                    onClick={() => {
                      setSelect(item);
                    }}
                    key={index}
                  >
                    <img src={tileURL[item.filename]} alt="element"></img>
                    {item.name}
                  </div>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
