import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import Header from "./layout/Header";
import { toast } from "react-toastify";
import socketClient from "socket.io-client";
import { Typeahead } from "react-bootstrap-typeahead";
import productService from "../service/productService";
import oderService from "../service/oderService";
import odersaveService from "../service/odersaveService";
import Print from "./support/Print";
import OderFireBaseService from "../service/OderFireBaseService";
import cashService from "../service/cashService";

const Home = () => {
  const sockets = socketClient("http://192.168.1.39:3001");
  let flag = 1;
  const [show, setshow] = useState(false);
  const [message, setMessage] = useState(0);
  const [content, setContent] = useState([]);
  const [listcash, setlistcash] = useState([]);
  const [table, settable] = useState("");
  const [listOdering, setlistOdering] = useState([]);
  const [listtt, setlisttt] = useState([]);
  const [listshow, setlistshow] = useState([]);
  const [listoder, setlistoder] = useState([[]]);
  const [singleSelections, setSingleSelections] = useState([]);
  const [options, setopt] = useState([]);
  const [sumCash, setSumcash] = useState(0);
  const [tongtiens, settongtiens] = useState(0);
  const [note, setnote] = useState("");
  const [infirebase, setinfirebaese] = useState(false);
  let current = new Date();
  let date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const users = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;

  useEffect(() => {
    let lst = listoder,
      ltt = [],
      listshows = [];
    productService
      .getall()
      .then((res) => {
        console.log(res.data);
        setopt(res.data);

        oderService.getall().then((resw) => {
          let data = [];
          for (let i = 0; i <= 16; i++) {
            if (i != 0) {
              data = resw.data
                .filter((item) => item.soban == i)
                .sort((a, b) => a.trangthai - b.trangthai);

              let tam = {
                trangthai: data[0] ? data[0].trangthai : 0,
                mes: data,
              };
              listshows.push(tam);
            } else {
              listshows.push({});
            }
          }

          setlistshow([...listshows]);
        });
      })
      .catch((err) => {
        setinfirebaese(true);
        productService.getAllfirebase().then((res) => {
          setopt(Object.values(res.data));
        });
        OderFireBaseService.getAll().then((res) => {
          let newarry = [];
         if (res.data)
           Object.values(res.data).map((item, index) => {
            console.log(item.data);
            newarry.push(...item.data);
          });
          let data = [];
          for (let i = 0; i <= 16; i++) {
            if (i != 0) {
              data = newarry
                .filter((item) => item.soban == i)
                .sort((a, b) => a.trangthai - b.trangthai);

              let tam = {
                trangthai: data[0] ? data[0].trangthai : 0,
                mes: data,
              };
              listshows.push(tam);
            } else {
              listshows.push({});
            }
          }

          setlistshow([...listshows]);
        });
      });
  }, []);
  const adddata = async (e) => {
    await oderService.add(e).then((res) => {
      let ms = { ban: table, trangthai: 1, mes: listOdering };
      sockets.emit("chat messages", ms);
    });
    return;
  };
  useEffect(() => {
    let lst = listoder,
      ltt = [];
    if (lst[0].length == 0 && lst.length < 2) {
      for (let i = 0; i <= 16; i++) {
        let item = {};
        lst[i] = item;
        ltt[i] = 0;
      }
    } else {
      ltt = listtt;
    }

    if (flag == 1) {
      let index = -1;
      sockets.on("chat messages", (message) => {
        let listshows = [];
        oderService.getall().then((resw) => {
          let data = [];
          for (let i = 0; i <= 16; i++) {
            if (i != 0) {
              data = resw.data
                .filter((item) => item.soban == i)
                .sort((a, b) => a.trangthai - b.trangthai);

              let tam = {
                trangthai: data[0] ? data[0].trangthai : 0,
                mes: data,
              };
              listshows.push(tam);
            } else {
              listshows.push({});
            }
          }

          setlistshow([...listshows]);
        });
      });

      flag = 0;
    }
    localStorage.setItem("oder", JSON.stringify(lst));
    setlistoder([...lst]);
  }, [message]);
  const findproduct = (id) => {
    console.log(options);
    const results2 = options.filter((element) => {
      return element !== null && element !== undefined;
    });
    let pro = results2.filter(
      (item) => item.productID !== null && item.productID == id
    );

    return pro[0];
  };
  const deleteByIndex = (e, statusoder) => {
    if (statusoder == 1) {
      let tam = listOdering[e];
      setlistOdering(
        listOdering.filter(
          (item) => item.product.productID != tam.product.productID
        )
      );
    } else {
      oderService.delete(listcash[e].oderId).then((res) => {
        let listcashnew = listcash.filter(
          (item) => item.oderId != listcash[e].oderId
        );
        setlistcash(listcashnew);
        setSumcash(
          listcashnew.reduce(
            (a, v) => (a = a + v.soluong * findproduct(v.productId).price),
            0
          )
        );
        let ms = { ban: table, trangthai: 3, mes: [] };
        sockets.emit("chat messages", ms);
      });
    }
  };
  const SelectTable = (e) => {
    let list = listoder;
    let listDaoder = [],
      listDaoders = [];
    setlistOdering([]);
    oderService
      .getbyban(e)
      .then((res) => {
        if (res.data.length > 0) {
          listDaoder =
            res.data.filter((item) => item.trangthai == 1).length > 0
              ? res.data.filter((item) => item.trangthai == 1)
              : res.data.filter((item) => item.trangthai == 2);
          setContent(listDaoder);
          listDaoders = res.data.filter((item) => item.trangthai == 3);
          setlistcash(listDaoders);
          setSumcash(
            res.data.reduce(
              (a, v) => (a = a + v.soluong * findproduct(v.productId).price),
              0
            )
          );
        } else {
          setContent([]);
          setlistcash([]);
          setSumcash(0);
        }
      })
      .catch((err) => {
        OderFireBaseService.getbyId(e).then((res) => {
          if (res.data) {
            let data = Object.values(res.data)[0];
            listDaoder =
              data.filter((item) => item.trangthai == 1).length > 0
                ? data.filter((item) => item.trangthai == 1)
                : data.filter((item) => item.trangthai == 2);
            setContent(listDaoder);
            listDaoders = data.filter((item) => item.trangthai == 3);
            setlistcash(listDaoders);
            setSumcash(
              data.reduce(
                (a, v) => (a = a + v.soluong * findproduct(v.productId).price),
                0
              )
            );
          } else {
            setContent([]);
            setlistcash([]);
            setSumcash(0);
          }
        });

        console.log(err);
      });

    settable(e);
    setshow(true);
    let listnote = localStorage.getItem("note")
      ? JSON.parse(localStorage.getItem("note"))
      : [];

    if (listshow[e].trangthai == 0) {
      listnote[e] = null;
    }
    if (listnote.length > 0) setnote(listnote[e]);
    localStorage.setItem("note", JSON.stringify(listnote));
  };

  const OnclickOder = () => {
    const datenew = new Date();
    const time = datenew.getHours() + ":" + datenew.getMinutes();
    let ms = { ban: table, trangthai: 3, mes: listOdering };

    let listbyban = [];
    listbyban = listshow[ms.ban].mes;
    let flags = 0;
    let listoffirebane = [];
    listOdering.map((item, index) => {
      let order = {
        gio: time,
        ngay: date,
        productId: item.product.productID,
        soban: ms.ban,
        soluong: item.soluong,
        trangthai: ms.trangthai,
      };
      if (
        listoffirebane.findIndex(
          (e) => e.productId == item.product.productID
        ) == -1
      ) {
        listoffirebane.push(order);
      }
    });
    ms.mes.map((item, i) => {
      let order = {
        soban: ms.ban,
        trangthai: ms.trangthai,
        soluong: item.soluong,
        productId: item.product.productID,
        ngay: date,
        gio: time,
      };

      if (listbyban.length == 0) {
        listbyban.push(order);

        adddata(order);
      } else {
        let vitri = listbyban.findIndex(
          (e) => e.productId == item.product.productID
        );
        if (vitri == -1) {
          listbyban.push(order);
          adddata(order);
        } else {
          if (listbyban[vitri].trangthai == 3) {
            listbyban[vitri].soluong =
              Number(item.soluong) + Number(listbyban[vitri].soluong);
            let orders = {
              soban: ms.ban,
              trangthai: ms.trangthai,
              soluong: listbyban[vitri].soluong,
              productId: item.product.productID,
              ngay: date,
              gio: time,
            };
            oderService.edit(listbyban[vitri].oderId, orders).then((res) => {
              sockets.emit("chat messages", ms);
            });
          } else {
            listbyban.push(order);
            adddata(order);
          }
        }
      }

      flags = i;
    });

    OderFireBaseService.getAll().then((res) => {
      let listOlder = [];
      listOlder = Object.values(res.data).filter((e) => e.id == table)[0]
        ? Object.values(res.data).filter((e) => (e.id = ms.ban))[0].data
        : [];
      listoffirebane.map((item, index) => {
        let vt = listOlder.findIndex((e) => e.productId == item.productId);
        if (vt > -1) {
          listOlder[vt].soluong = listOlder[vt].soluong + item.soluong;
        } else {
          listOlder.push(item);
        }
      });
      OderFireBaseService.update({ id: ms.ban, data: listOlder }).then(
        (res) => {
          toast.success("conf");
        }
      );
    });

    if (flags + 1 == ms.mes.length) {
      let listtest = listshow;
      listtest[ms.ban].trangthai = 1;
      listtest[ms.ban].mes = listbyban;
      setlistshow(listtest);
      setMessage(message + 1);

      // sockets.emit('chat messages', ms);
      setshow(false);

      flag = 1;
    }
  };

  const OnclickCash = () => {
    let flags = 0;
    let ms = { ban: table, trangthai: 4, mes: [] };
    let lisset = listshow;
    lisset[table].trangthai = 0;
    setlistshow(lisset);
    cashService
      .update({
        date: date,
        id: listshow[ms.ban].mes[0].oderId,
        data: listshow[ms.ban].mes,
      })
      .then((res) => {
        toast.success("ok");
        cashService.getbyday(date).then((ress) => {
          let newarry = [];
          Object.values(ress.data).map((item, index) => {
            console.log(item.data);
            newarry.push(...item.data);
          });
          console.log(newarry);
        });
      });
    listshow[ms.ban].mes.map((item, index) => {
      odersaveService.add(item).then((re) => {
        // sockets.emit('chat messages', ms);
      });
      oderService.delete(item.oderId).then((r) => {
        sockets.emit("chat messages", ms);
      });
      let sanpham = findproduct(item.productId);
      if (sanpham.categoryId == 1) {
        sanpham.SoLuong = parseInt(sanpham.SoLuong) - item.soluong;

        productService.edit(item.productId, sanpham).then((res) => {
          sockets.emit("chat messages", ms);
        });
      }
      flags = index;
    });

    if (flags + 1 == listshow[ms.ban].mes.length) {
      setshow(false);
      // sockets.emit('chat messages', ms);
    }
  };

  const changeProduct = (e) => {
    let listOderings = listOdering;
    let index = listOderings.findIndex(
      (item) => item.product.productID == e[0].productID
    );

    if (index == -1) {
      let product = { product: e[0], soluong: 1 };
      listOderings.push(product);
    } else listOderings[index].soluong += 1;

    setlistOdering([...listOderings]);
    let tong = 0;
    listOderings.map((item, index) => {
      tong += item.product.price * item.soluong;
    });
    settongtiens(tong);
  };
  const getNoteByNumberTable = (numberTable) => {
    let listnote = localStorage.getItem("note")
      ? JSON.parse(localStorage.getItem("note"))
      : [];

    return listnote[numberTable];
  };
  const changeNote = (e) => {
    let listnote = localStorage.getItem("note")
      ? JSON.parse(localStorage.getItem("note"))
      : [];

    listnote[table] = e.target.value;
    localStorage.setItem("note", JSON.stringify(listnote));
    setnote(e.target.value);
  };
  const changesoluong = (e, index, trangthai) => {
    let contentnew = trangthai == 3 ? listcash : listOdering;
    if (e.target.value == 0) e.target.value = 1;
    contentnew[index].soluong = e.target.value;
    let newtable = contentnew[index];
    oderService.edit(newtable.oderId, newtable).then((res) => {});
    if (trangthai == 3) {
      setSumcash(
        contentnew.reduce(
          (a, v) => (a = a + v.soluong * findproduct(v.productId).price),
          0
        )
      );
      setlistcash([...contentnew]);
    } else {
      setlistOdering([...contentnew]);
    }

    let ms = { ban: table, trangthai: 3, mes: [] };
    sockets.emit("chat messages", ms);
  };

  return (
    <>
      <Header />
      <main className="mains">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div class="row border">
              {listshow.map((item, index) => {
                return (
                  <>
                    {index != 0 &&
                      (item.trangthai ? (
                        <>
                          {item.trangthai == 3 ? (
                            <div
                              onClick={(e) => SelectTable(index)}
                              className="col-lg-3 col-md-6 col-sm-6 border ban align-middle ups"
                            >
                              Bàn {index}{" "}
                              {getNoteByNumberTable(index)
                                ? "(" + getNoteByNumberTable(index) + ")"
                                : ""}
                            </div>
                          ) : (
                            <div
                              onClick={(e) => SelectTable(index)}
                              className="col-lg-3 col-md-6 col-sm-6 border ban align-middle "
                            >
                              Bàn {index}{" "}
                              {getNoteByNumberTable(index)
                                ? "(" + getNoteByNumberTable(index) + ")"
                                : ""}
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          onClick={(e) => SelectTable(index)}
                          className="col-lg-3 col-md-6 col-sm-6 border ban align-middle "
                        >
                          Bàn {index}
                        </div>
                      ))}
                  </>
                );
              })}
            </div>

            <Modal
              show={show}
              size="lg"
              onHide={() => setshow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header
                closeButton
                style={{ backgroundColor: "antiquewhite" }}
              >
                <Modal.Title id="example-custom-modal-styling-title">
                  <h3 className="text-center">Bàn {table}</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!infirebase && (
                  <>
                    <h1>Chọn món oder </h1>

                    <input
                      type="text"
                      className="form-control  border-radius"
                      placeholder="Ghi chú"
                      onChange={(e) => changeNote(e)}
                      value={note}
                    />

                    <Typeahead
                      id="basic-typeahead-single"
                      labelKey="name"
                      onChange={(e) => changeProduct(e)}
                      options={options}
                      placeholder="Chọn đồ uống..."
                      selected={singleSelections}
                    />
                  </>
                )}

                {listOdering && listOdering.length > 0 && (
                  <div className="row">
                    <h1>Đang oder </h1>
                    <div
                      className="col col-lg-3 border"
                      style={{ textAlign: "center" }}
                    >
                      Tên đồ uống
                    </div>
                    <div
                      className="col col-lg-2 border"
                      style={{ textAlign: "center" }}
                    >
                      Giá
                    </div>
                    <div
                      className="col col-lg-2     border"
                      style={{ textAlign: "center" }}
                    >
                      Số lượng
                    </div>
                    <div
                      className="col col-lg-3 border"
                      style={{ textAlign: "center" }}
                    >
                      Thành tiền
                    </div>
                    {!infirebase && (
                      <div
                        className="col col-lg-2 border"
                        style={{ textAlign: "center" }}
                      ></div>
                    )}
                  </div>
                )}
                {listOdering &&
                  listOdering.length > 0 &&
                  listOdering.map((item, index) => {
                    return (
                      <>
                        <div className="row">
                          <div
                            className="col col-lg-3 border"
                            style={{ textAlign: "center" }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            className="col col-lg-2 border"
                            style={{ textAlign: "center" }}
                          >
                            {item.product.price}
                          </div>
                          <div
                            className="col col-lg-2 border"
                            style={{ textAlign: "center" }}
                          >
                            <input
                              type="number"
                              className="form-control  border-radius"
                              onChange={(e) =>
                                changesoluong(e, index, item.trangthai)
                              }
                              value={item.soluong}
                            />
                          </div>
                          <div
                            className="col col-lg-3 border"
                            style={{ textAlign: "center" }}
                          >
                            {item.product.price * item.soluong}
                          </div>
                          {!infirebase && (
                            <div
                              onClick={() => deleteByIndex(index, 1)}
                              className="col col-lg-2 border trash"
                              style={{ textAlign: "center" }}
                            >
                              <i class="bi bi-trash"></i>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}

                {listcash && listcash.length > 0 && (
                  <div className="row">
                    <h3>Đã oder </h3>
                    <div
                      className="col col-lg-3 border"
                      style={{ textAlign: "center" }}
                    >
                      Tên đồ uống
                    </div>
                    <div
                      className="col col-lg-2 border"
                      style={{ textAlign: "center" }}
                    >
                      Giá
                    </div>
                    <div
                      className="col col-lg-2     border"
                      style={{ textAlign: "center" }}
                    >
                      Số lượng
                    </div>
                    <div
                      className="col col-lg-3 border"
                      style={{ textAlign: "center" }}
                    >
                      Thành tiền
                    </div>
                    {!infirebase && (
                      <div
                        className="col col-lg-2 border"
                        style={{ textAlign: "center" }}
                      ></div>
                    )}
                  </div>
                )}

                {listcash &&
                  listcash.length > 0 &&
                  listcash.map((item, index) => {
                    return (
                      <>
                        <div className="row">
                          <div
                            className="col col-lg-3 border"
                            style={{ textAlign: "center" }}
                          >
                            {findproduct(item.productId).name}
                          </div>
                          <div
                            className="col col-lg-2 border"
                            style={{ textAlign: "center" }}
                          >
                            {findproduct(item.productId).price}
                          </div>
                          <div
                            className="col col-lg-2 border"
                            style={{ textAlign: "center" }}
                          >
                            <input
                              type="number"
                              className="form-control  border-radius"
                              onChange={(e) =>
                                changesoluong(e, index, item.trangthai)
                              }
                              value={item.soluong}
                            />
                          </div>
                          <div
                            className="col col-lg-3 border"
                            style={{ textAlign: "center" }}
                          >
                            {findproduct(item.productId).price * item.soluong}
                          </div>
                          {!infirebase && (
                            <div
                              onClick={() => deleteByIndex(index, 3)}
                              className="col col-lg-2 border trash"
                              style={{ textAlign: "center" }}
                            >
                              <i class="bi bi-trash"></i>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}
                {sumCash > 0 && (
                  <div className="row">
                    <div
                      className="col col-lg-4 border"
                      style={{ textAlign: "center", fontWeight: "bolder" }}
                    >
                      Tổng tiền
                    </div>
                    <div
                      className="col col-lg-8 border"
                      style={{ textAlign: "center", fontWeight: "bolder" }}
                    >
                      {sumCash}
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col col-lg-6">
                    {!infirebase &&
                      listcash &&
                      listcash.length > 0 &&
                      listshow[table] &&
                      listshow[table].trangthai == 3 && (
                        // <Print content={listcash} id={table} OnclickCash={OnclickCash} />
                        <button
                          className="btn btn-primary"
                          onClick={() => OnclickCash()}
                        >
                          Oder
                        </button>
                      )}
                  </div>
                  {!infirebase && listOdering && listOdering.length > 0 && (
                    <div
                      className="col col-lg-6"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => OnclickOder()}
                      >
                        Oder
                      </button>
                    </div>
                  )}
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
