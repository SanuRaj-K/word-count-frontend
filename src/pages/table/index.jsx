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
    const toastId = toast.loading("Loading...");
    if (value) {
      axios
        .put(`/removefav/${id}`)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message, { id: toastId });
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
          toast.success(res.data.message, { id: toastId });
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
    const toastId = toast.loading("Loading...");
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, { id: toastId });
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
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
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
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500 hover:text-red-500"
                              >
                                <path
                                  d="M0 0 C10.81085063 -0.64865104 18.95905641 -0.34885513 27.38671875 7.11328125 C29.32962108 9.02227604 31.1914821 10.96415443 33 13 C36.10732904 11.61439191 38.2413724 9.97369275 40.6875 7.625 C48.3894877 0.868128 55.05559966 -0.74813201 65.33203125 -0.44921875 C72.00495183 0.36801859 77.42827272 2.8962105 81.9375 7.9375 C87.96311158 16.88462022 89.28316485 25.50858166 87.46875 36.1015625 C85.03539797 46.54910656 80.78279428 53.77888996 74 62 C73.484375 62.62777344 72.96875 63.25554687 72.4375 63.90234375 C71.30027944 65.27540835 70.15162227 66.63899186 69 68 C64.30818929 67.1237694 61.82851845 64.24268829 58.57910156 60.95141602 C57.94453537 60.32050049 57.30996918 59.68958496 56.65617371 59.03955078 C54.56018606 56.95167097 52.4752522 54.85312429 50.390625 52.75390625 C48.93953689 51.30229966 47.48793075 49.85121074 46.03582764 48.40061951 C42.99488361 45.35958575 39.95917738 42.31344674 36.92724609 39.26342773 C33.03261214 35.34607652 29.12697044 31.43992627 25.21759415 27.53729343 C22.21989085 24.54292419 19.22718329 21.54360361 16.23607635 18.54264641 C14.79723758 17.09994788 13.3570351 15.65860813 11.91547394 14.21862984 C9.90644029 12.20996524 7.90400363 10.19495574 5.90332031 8.17797852 C5.30180649 7.57894211 4.70029266 6.9799057 4.08055115 6.36271667 C0 2.22874136 0 2.22874136 0 0 Z "
                                  fill="#000000"
                                  transform="translate(30,16)"
                                />
                                <path
                                  d="M0 0 C2.78382043 1.27170385 4.82934578 2.58060283 6.9866333 4.74612427 C7.54746613 5.30420776 8.10829895 5.86229126 8.68612671 6.43728638 C9.28889435 7.04724457 9.89166199 7.65720276 10.51269531 8.28564453 C11.15701508 8.92967224 11.80133484 9.57369995 12.46517944 10.23724365 C14.59093698 12.36439307 16.70952508 14.49853612 18.828125 16.6328125 C20.30170781 18.11012593 21.77573318 19.58699804 23.25018311 21.06344604 C27.12780821 24.94870369 30.99938941 28.83993029 34.86975098 32.73242188 C38.82099939 36.70413678 42.77792261 40.670189 46.734375 44.63671875 C54.49515421 52.4189412 62.24956148 60.20747999 70 68 C66.65160877 72.23864249 63.26819663 75.52462418 59.0625 78.875 C58.45470703 79.38546875 57.84691406 79.8959375 57.22070312 80.421875 C52.81974706 83.93504381 52.81974706 83.93504381 49.53515625 84.1953125 C45.66683106 82.37141804 42.61994258 79.75874099 39.375 77 C37.94533923 75.80856167 36.51565163 74.61715554 35.0859375 73.42578125 C34.38952148 72.84006348 33.69310547 72.2543457 32.97558594 71.65087891 C31.26205993 70.2189878 29.5344864 68.81061799 27.7890625 67.41796875 C13.76821581 56.20521881 -0.70555529 42.0551031 -3.71875 23.5703125 C-4.60227499 15.49587581 -4.36643658 8.50035092 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z "
                                  fill="#000000"
                                  transform="translate(14,28)"
                                />
                                <path
                                  d="M0 0 C4.49954697 0.35313554 6.52644338 2.02147725 9.6701355 5.14874268 C10.57876846 6.04320602 11.48740143 6.93766937 12.42356873 7.85923767 C13.4178423 8.85809865 14.41189941 9.85717512 15.40576172 10.85644531 C16.46148464 11.90347227 17.51803985 12.9496606 18.57536316 13.99507141 C21.4419595 16.83488937 24.29561402 19.68738423 27.14631414 22.54314899 C29.52616215 24.92513568 31.91193446 27.30114438 34.29763901 29.67726302 C39.92353209 35.28096817 45.53870296 40.89526172 51.14746094 46.51611328 C56.9383515 52.31909731 62.74738219 58.10345664 68.56555927 63.87907147 C73.55816636 68.83649088 78.53912955 73.80539962 83.51091397 78.78370166 C86.48148649 81.75790596 89.45637149 84.72745176 92.44259262 87.68595123 C95.24840594 90.46668707 98.03943519 93.26144849 100.81962013 96.06780052 C101.84360916 97.09653698 102.87276935 98.12015504 103.90732765 99.1382618 C105.31594364 100.52607678 106.70446741 101.93419854 108.09176636 103.34332275 C108.87524885 104.12646976 109.65873135 104.90961678 110.46595573 105.71649551 C112 108 112 108 111.7442646 110.79104233 C111.49865728 111.51999836 111.25304996 112.24895439 111 113 C108.79425621 113.74663734 108.79425621 113.74663734 106 114 C103.69529152 112.45033836 103.69529152 112.45033836 101.29190063 110.05380249 C100.37485352 109.15367432 99.4578064 108.25354614 98.51296997 107.32614136 C97.50915781 106.31066284 96.50565876 105.29487474 95.50244141 104.27880859 C94.43729589 103.22179141 93.37087777 102.1660553 92.30328369 101.11151123 C89.40525875 98.24088306 86.52658689 95.35154428 83.65175676 92.45770979 C80.64401679 89.43480238 77.62169188 86.42653573 74.60165405 83.41592407 C69.53201475 78.35720746 64.47517316 73.28595545 59.42529297 68.20751953 C53.58277552 62.33234725 47.71895557 56.4791038 41.84359992 50.63678491 C36.80403608 45.62442949 31.77623525 40.60049987 26.75811899 35.56667197 C23.75911381 32.55830187 20.7561769 29.5541581 17.7426033 26.56037521 C14.91030012 23.74537628 12.09302489 20.91615859 9.28678131 18.07518768 C8.25311402 17.03357162 7.21427851 15.99705593 6.17004776 14.96603012 C4.74826266 13.56057925 3.34661658 12.13484092 1.94619751 10.70809937 C1.15534067 9.91498037 0.36448383 9.12186138 -0.45033836 8.30470848 C-2 6 -2 6 -1.80913734 3.26824379 C-1 1 -1 1 0 0 Z "
                                  fill="#000000"
                                  transform="translate(9,7)"
                                />
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
