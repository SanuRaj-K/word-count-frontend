import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";


const Table = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    axios
      .get("/list")
      .then((res) => {
        const data = res.data.data;
        setListData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFavourite = (id, value) => {
    const toastId=toast.loading('Loading...')
    if (value) {
      axios
        .put(`/removefav/${id}`)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message, {id:toastId});
          setListData((prevData) =>
            prevData.map((item) =>
              item.searchId === id ? { ...item, favourite: false } : item
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`/addfav/${id}`)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message, {id:toastId});
          setListData((prevData) =>
            prevData.map((item) =>
              item.searchId === id ? { ...item, favourite: true } : item
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  

  const handleDelete = (id) => {
    const toastId= toast.loading('Loading...')
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {id:toastId});
        setListData((prevItems) =>
          prevItems.filter((item) => item.searchId !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="overflow-hidden min-h-screen rounded-lg border border-gray-200 shadow-md m-5">
        {listData?.length === 0 ? (
          <div className=" h-screen w-full flex   justify-center items-center text-center">
            <div>
              No Data{" "}
              <Link to={"/"} className=" underline">
                Seach Domain
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex  justify-between items-center text-[20px] font-semibold py-5 px-10">
              <span>Results</span>
              <span>
                <Link className=" underline" to={"/"}>
                  Back to Search
                </Link>
              </span>
            </div>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Domain Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Word Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Favourite
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Web Link
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Media Link
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {listData?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">
                      {item.domainName}
                    </td>
                    <td className="px-6 py-4">{item.wordCount}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full ${
                          item.favourite
                            ? " bg-green-50 text-green-600"
                            : "text-red-600 bg-red-50"
                        }  px-2 py-1 text-xs font-semibold `}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.favourite ? "bg-green-600" : "bg-red-600"
                          }  `}
                        ></span>
                        {item.favourite ? "True" : "False"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          Link 1
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                          Link 2
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                          Link 3
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          Link 1
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                          Link 2
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                          Link 3
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => handleDelete(item.searchId)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-500 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            handleFavourite(item.searchId, item.favourite)
                          }
                        >
                          {item.favourite ? (
                            <>
                              <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="300.000000pt"
                                className="h-6 w-6 text-gray-500 hover:text-red-500"
                                height="300.000000pt"
                                viewBox="0 0 300.000000 300.000000"
                                preserveAspectRatio="xMidYMid meet"
                              >
                                <metadata>
                                  Created by potrace 1.10, written by Peter
                                  Selinger 2001-2011
                                </metadata>
                                <g
                                  transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                                  fill="#000000"
                                  stroke="none"
                                >
                                  <path
                                    d="M202 2797 c-43 -45 -32 -70 85 -188 59 -60 110 -109 115 -109 23 0
-1 34 -86 120 -52 52 -95 102 -96 110 -5 34 1 49 21 55 18 6 40 -11 123 -93
93 -92 154 -140 145 -113 -2 5 -55 62 -118 126 -124 125 -147 136 -189 92z"
                                  />
                                  <path
                                    d="M781 2685 c-91 -20 -148 -41 -208 -75 l-53 -30 53 -53 52 -52 60 23
c180 71 354 67 520 -13 53 -25 99 -60 169 -125 129 -121 133 -122 262 0 67 63
117 100 167 125 341 168 744 -9 851 -374 54 -183 14 -396 -103 -551 -22 -30
-144 -158 -270 -284 l-228 -228 55 -54 c31 -30 56 -54 57 -54 9 0 486 491 511
526 285 397 150 957 -279 1160 -115 54 -185 69 -327 68 -146 0 -214 -15 -338
-76 -56 -27 -106 -63 -157 -110 l-74 -69 -47 51 c-152 163 -438 246 -673 195z
m378 -59 c102 -36 190 -87 260 -152 33 -30 69 -57 80 -59 15 -3 39 12 79 49
147 135 300 196 497 196 162 0 311 -50 436 -146 115 -88 190 -196 241 -349 27
-78 31 -106 34 -215 3 -141 -13 -222 -65 -335 -49 -105 -84 -149 -255 -323
-88 -89 -163 -166 -166 -170 -3 -4 -36 -36 -73 -71 l-67 -65 -25 24 c-14 13
-25 28 -25 33 0 5 107 118 238 251 249 254 283 298 330 428 38 106 44 286 12
390 -66 220 -216 378 -420 442 -99 32 -181 40 -274 27 -159 -22 -257 -72 -388
-197 -89 -85 -109 -90 -159 -42 -136 129 -201 173 -321 214 -133 45 -289 39
-441 -17 -55 -21 -58 -21 -77 -4 -32 29 -24 44 34 70 94 42 178 55 316 51 102
-3 138 -8 199 -30z"
                                  />
                                  <path
                                    d="M354 2422 c-62 -75 -124 -194 -151 -292 -24 -89 -24 -299 1 -390 24
-88 85 -214 138 -281 24 -31 288 -304 588 -607 475 -482 548 -552 574 -552 25
0 68 38 296 266 l267 265 -56 58 -56 58 -227 -231 -228 -231 -141 145 c-78 80
-316 321 -528 535 -297 300 -395 405 -424 455 -129 223 -110 491 51 702 l51
68 -50 50 -49 49 -56 -67z m91 -12 c15 -17 16 -22 4 -37 -8 -10 -17 -20 -20
-23 -3 -3 -27 -41 -52 -85 -132 -228 -116 -515 39 -721 56 -74 1023 -1050
1060 -1070 31 -17 32 -17 70 13 22 17 121 115 222 217 100 102 186 186 190
186 13 0 52 -40 52 -52 0 -13 -455 -474 -482 -489 -30 -16 -65 12 -237 188
-90 92 -323 328 -517 523 -194 195 -373 382 -398 414 -60 78 -110 182 -136
286 -30 119 -25 290 13 404 23 72 82 182 114 214 7 8 18 22 23 33 14 24 32 24
55 -1z"
                                  />
                                  <path
                                    d="M630 2445 c0 -22 1362 -1391 1392 -1398 10 -3 18 -2 18 1 0 4 -317
324 -705 712 -467 467 -705 698 -705 685z"
                                  />
                                  <path
                                    d="M530 2378 c0 -13 1399 -1418 1413 -1418 4 0 7 6 7 13 0 12 -1375
1393 -1404 1409 -11 6 -16 5 -16 -4z"
                                  />
                                  <path
                                    d="M2160 915 c0 -11 130 -149 313 -332 171 -172 313 -317 315 -323 6
-18 -19 -50 -40 -50 -14 0 -122 101 -329 308 -280 278 -339 332 -339 305 0 -5
145 -154 323 -330 345 -343 344 -342 393 -294 51 49 49 52 -302 401 -179 179
-327 327 -330 329 -2 2 -4 -4 -4 -14z"
                                  />
                                </g>
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-gray-500 hover:text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.998 21.645l-.27-.248C5.922 16.158 2.25 12.774 2.25 8.857c0-2.515 1.979-4.457 4.5-4.457 1.52 0 2.879.719 3.748 1.827.869-1.108 2.227-1.827 3.748-1.827 2.521 0 4.5 1.942 4.5 4.457 0 3.917-3.673 7.301-9.479 12.54l-.269.248z"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Table;
