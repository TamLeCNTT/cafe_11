import { useState, useEffect } from 'react';
import React from "react";
import Chart from 'chart.js/auto';
import { Bar, Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Header from '../layout/Header';
import productService from '../../service/productService';
import odersaveService from '../../service/odersaveService';
import cashService from '../../service/cashService';
import OderFireBaseService from '../../service/OderFireBaseService';
const Thongke = () => {
    const [ngay, setngay] = useState(new Date().toLocaleDateString('en-CA'));
    const [ngaybyly, setngaybyly] = useState(new Date().toLocaleDateString('en-CA'));
    const [thang, setthang] = useState(new Date().getMonth() + 1)
    const [year, setyear] = useState(new Date().getFullYear())
    const [tongban, settongban] = useState(0);
    const [tonhko, settonkho] = useState(0);
    const [date, setdate] = useState();
    const [doanhthuhomnay, setdoanhthuhomnay] = useState(0);
    const [soluongdonhomnay, setsoluongdonhomnay] = useState(0);
    const [doanhthu7y, setdoanhthu7] = useState(0);
    const [soluongdon7, setsoluongdon7] = useState(0);
    const [loai, setloai] = useState(1);
    const [infirebase,setinfirebaese]=useState(false)
    const [label, setlable] = useState([])
    const [labelget, setlableget] = useState([])
    const [soluongkho, setsoluongkho] = useState([])
    const [soluongban, setsoluongban] = useState([])
    const [soluonglytheongay, setsoluonglytheongay] = useState(0)
    const [dthutheongay, setdttheongay] = useState(0)
    const [soluonglytheothang, setsoluonglytheothang] = useState(0)
    const [dthutheothang, setdttheothang] = useState(0)
    const [listsp, setlistsp] = useState([]);
    const [listid, setlistid] = useState([]);
    const minOffset = 0;
    const maxOffset = 60;
    let tienvons = 0;
    let et = 0;
    let navitive = useNavigate()
    const [listyear, setlistyear] = useState([])
    let current = new Date()
    let currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    // const [year, setyear] = useState(thisYear);
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null
    useEffect(() => {
        let today = new Date()
        let datenew = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate())
        setdate(datenew)
        let lablenew = []
        let lablenhap = []
        let soluongkhonew = []

        let listidnew = []
        productService.getall().then(res => {
            
            res.data.map((item, index) => {
                lablenew.push(item.name)
                listidnew.push(item.productID)
                if (item.categoryId == 1) {

                    lablenhap.push(item.name)
                    soluongkhonew.push(item.SoLuong)
                }

            })
            soluonglybanrabyngay(datenew, res.data)
            
            soluonglybanrabythang(datenew, res.data)
            setsoluongkho(soluongkhonew)
            setlableget(lablenhap)
            setlable(lablenew)
            setlistid(listidnew)
            setlistsp(res.data)
            soluongbanrabyngay(datenew, listidnew)



        }).catch(err => {
            setinfirebaese(true)
            productService.getAllfirebase().then(
                res => {
                    
                    const results2 = Object.values(res.data).filter(element => {
                        return element !== null && element !== undefined;
                      });
                    console.log(results2)
                    




                    results2.map((item, index) => {
                        lablenew.push(item.name)
                        listidnew.push(item.productID)
                        if (item.categoryId == 1) {
        
                            lablenhap.push(item.name)
                            soluongkhonew.push(item.SoLuong)
                        }
        
                    })
                    soluonglybanrabyngay(datenew, results2)
                    
                    soluonglybanrabythang(datenew, results2)
                    setsoluongkho(soluongkhonew)
                    setlableget(lablenhap)
                    setlable(lablenew)
                    setlistid(listidnew)
                    setlistsp(res.data)
                    soluongbanrabyngay(datenew, listidnew)

                    
                }
            )

        })
        const options = [];

        for (let i = 0; i <= maxOffset; i++) {
            const yeared = year - i;

            options.push(yeared);
        }
        setlistyear(options)

        // cashService.getAll().then(
        //     ress => {
        //         let newarry=[]
        //         Object.values(ress.data).map((item, index) => {
        //             Object.values(item).map((value, index) => {
        //                 newarry.push(...value.data)
        //             })
                   
        //         })
        //         console.log(newarry,Object.values(ress.data))
        //     }
        // )
      
    }, [])
    const getdate = (today) => {
        today = new Date(today)
        return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate())
    }
    const soluonglybanrabyngay = (datenew, list) => {

        let soluongbannew = 0
        let doangthunew = 0
        odersaveService.getbyngay(datenew).then(
            ress => {
                doangthunew = ress.data.reduce((a, v) => a = a + (v.soluong * findproduct(list, v.productId).price), 0)
                soluongbannew = ress.data.reduce((a, v) => a = a + v.soluong, 0)
                setdttheongay(doangthunew)
                setsoluonglytheongay(soluongbannew)
            }

        ).catch(
            err => {
                cashService.getbyday(datenew).then(
                    res => {
                        let newarry = []
                        if (res.data)
                        Object.values(res.data).map((item, index) => {
                            console.log(item.data)
                            newarry.push(...item.data)
                        })
                       console.log(newarry)
                        doangthunew = newarry.reduce((a, v) => a = a + (v.soluong * findproduct(list, v.productId).price), 0)
                        soluongbannew = newarry.reduce((a, v) => a = a + v.soluong, 0)
                        setdttheongay(doangthunew)
                        setsoluonglytheongay(soluongbannew)
                    }
                )
            }
        )
    }
    const soluonglybanrabythang = (datenew, list) => {

        let soluongbannew = 0
        let doangthunew = 0
        odersaveService.getbymonth(datenew).then(
            ress => {
                doangthunew = ress.data.reduce((a, v) => a = a + (v.soluong * (findproduct(list, v.productId).price)), 0)
                soluongbannew = ress.data.reduce((a, v) => a = a + v.soluong, 0)
                setdttheothang(doangthunew)
                setsoluonglytheothang(soluongbannew)
            }

        ).catch(
            err => {
                cashService.getAll().then(
                    res => {
                        let newarry = []
                        console.log(Object.values(res.data))
                        Object.values(res.data).map((item, index) => {
                          
                            Object.values(item).map((conten, vt) => {
                               if(new Date(conten.date).getMonth()==new Date(datenew).getMonth()&& new Date(conten.date).getFullYear()==new Date(datenew).getFullYear())
                               {
                                 
                                       newarry.push(...conten.data)
                               
                                    }
                            })
                            doangthunew =newarry.reduce((a, v) => a = a + (v.soluong * (findproduct(list, v.productId).price)), 0)
                            soluongbannew = newarry.reduce((a, v) => a = a + v.soluong, 0)
                            setdttheothang(doangthunew)
                            setsoluonglytheothang(soluongbannew)
                                    
                       })
                    }
                )
            }
        )
    }
    const soluongbanrabyngay = (datenew, listidnew) => {
        let soluongbannew = []
        odersaveService.getbyngay(datenew).then(
            ress => {
                console.log(ress.data)
                let list=[]
               
                
                    list = ress.data
                    console.log(list)
                    listidnew.map((item, index) => {

                        let sl = list.filter(e => e.productId == item)
                        soluongbannew.push(sl.reduce((a, v) => a = a + v.soluong, 0))
                    })
                    setsoluongban(soluongbannew)
                            }

        ).catch(
            err => {
                cashService.getbyday(datenew).then(
                    ress => {
                        let newarry = []
                        if (ress.data)
                        Object.values(ress.data).map((item, index) => {
                            console.log(item.data)
                            newarry.push(...item.data)
                        })
                        console.log(newarry)
                       let  list = newarry
                        listidnew.map((item, index) => {

                            let sl = list.filter(e => e.productId == item)
                            soluongbannew.push(sl.reduce((a, v) => a = a + v.soluong, 0))
                        })
                        setsoluongban(soluongbannew)
                    }
                )
            }
        )
    }

    const soluongbanrabymonth = (datenew, listidnew) => {
        let soluongbannew = []
        odersaveService.getbymonth(datenew).then(
            ress => {
                listidnew.map((item, index) => {

                    let sl = ress.data.filter(e => e.productId == item)
                    soluongbannew.push(sl.reduce((a, v) => a = a + v.soluong, 0))
                })
                setsoluongban(soluongbannew)
            }

        ).catch(
            err => {
                cashService.getAll().then(
                    res => {
                        let newarry = []
                        console.log(Object.values(res.data))
                        Object.values(res.data).map((item, index) => {
                          
                            Object.values(item).map((conten, vt) => {
                               if(new Date(conten.date).getMonth()==new Date(datenew).getMonth()&& new Date(conten.date).getFullYear()==new Date(datenew).getFullYear())
                               {
                                 
                                       newarry.push(...conten.data)
                               
                                    }
                            })
                                
                        })
                        console.log(newarry,datenew)
                        listidnew.map((item, index) => {

                            let sl = newarry.filter(e => e.productId == item)
                            soluongbannew.push(sl.reduce((a, v) => a = Number(a) + Number(v.soluong), 0))
                        })
                        
                        setsoluongban(soluongbannew)   
                    }
                )
            }
        )
    }
    const soluongbanrabyyear = (datenew, listidnew) => {
        let soluongbannew = []
        odersaveService.getbyyear(datenew).then(
            ress => {
                listidnew.map((item, index) => {

                    let sl = ress.data.filter(e => e.productId == item)
                    soluongbannew.push(sl.reduce((a, v) => a = a + v.soluong, 0))
                })
                setsoluongban(soluongbannew)
            }

        ).catch(
            err => {
                cashService.getAll().then(
                    res => {
                        let newarry = []
                        console.log(Object.values(res.data))
                        Object.values(res.data).map((item, index) => {
                          
                            Object.values(item).map((conten, vt) => {
                               if( new Date(conten.date).getFullYear()==new Date(datenew).getFullYear())
                               {
                                 
                                       newarry.push(...conten.data)
                               
                                    }
                            })
                            console.log(newarry,datenew)
                            listidnew.map((item, index) => {

                                let sl = newarry.filter(e => e.productId == item)
                                soluongbannew.push(sl.reduce((a, v) => a = a + v.soluong, 0))
                            })
                            setsoluongban(soluongbannew)       
                        })
                       
                    }
                )
            }
        )
    }
    const findproduct = (list, id) => {
        const results2 = Object.values(list).filter(element => {
            return element !== null && element !== undefined;
          });
        let pro = results2.filter(item => item.productID == id)

        return pro[0]
    }
    const findproductbyname = (id) => {
        let pro = listsp.filter(item => item.name == id)

        return pro[0]
    }
    const changengay = (e) => {



        setngay(e.target.value)
    }
    const changengayly = (e) => {
        soluonglybanrabyngay(getdate(e.target.value), listsp)
        soluonglybanrabythang(getdate(e.target.value), listsp)
        setngaybyly(e.target.value)
    }
    const changethang = (e) => {
        setthang(e.target.value)
    }
    const changenam = (e) => {
        setyear(e.target.value)
    }
    const xem = () => {
        let date = year + "-" + thang + "-01" 
        if (loai == 1)
            soluongbanrabyngay(getdate(ngay), listid)
        else
            if (loai == 2) {
                console.log(date)
                soluongbanrabymonth(date, listid)
            }
            else {

                soluongbanrabyyear(date, listid)

            }
    }
    // const changengaybd = (e) => {
    //     // console.log(e.target.value)
    //     setngaybd(e.target.value)
    // }
    const changeloai = (e) => {

        setngay(new Date().toLocaleDateString('en-CA'))
        setthang(new Date().getMonth() + 1)
        setyear(new Date().getFullYear())
        setloai(e.target.value)
        let ngays = new Date().toLocaleDateString('en-CA')
        let thangs = new Date().getMonth() + 1
        let nam = new Date().getFullYear()
        let dates = nam + "-" + thangs + "-" + ngays
        if (e.target.value == 1) {

            soluongbanrabyngay(getdate(ngays), listid)
        }
        else
            if (e.target.value == 2) {

                soluongbanrabymonth(getdate(ngays), listid)
            }
            else {

                soluongbanrabyyear(getdate(ngays), listid)

            }


    }
    const onHandleChange = (evt) => {
        // // let sl = [];
        // // let ln = [];
        // // let dt = [];
        // // for (let i = 0; i < 12; i++) {
        // //     sl[i] = 0;
        // //     ln[i] = 0;
        // //     dt[i] = 0;
        // // }
        // setyear(evt.target.value);
        // // list.map((item, index) => {

        // //     let date = new Date(item.ngaylap)
        // //     let tienvon = 0;
        // //     // console.log(item)
        // //     if (date.getFullYear() == evt.target.value) {
        // //         item.giohang.map((items, index) => {
        // //             sl[date.getMonth()] += items.soluong
        // //             tienvon += items.hosanpham.giaNhap * items.soluong
        // //         })
        // //         ln[date.getMonth()] += (item.tongtien - tienvon)
        // //         dt[date.getMonth()] += item.tongtien
        // //     }
        // // })
        // // setsoluong(sl)
        // // setdoanhthu(dt)
        // // setloinhuan(ln)
    };

    return (
        <>  <Header />
            <main id="main" className="mains" style={{ width: "83%" }}>
                <div id="wrapper container">

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div className="container-fluid">


                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Thống kê</h1>
                                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                            </div>


                            <div className="row">


                                <div className="col col-6">
                                    <div className="row thongke-date">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                Chọn ngày
                                            </div>
                                            <input type="date" className="form-control  border-radius  thongke-date-input" value={ngaybyly} onChange={(e) => changengayly(e)} />

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-md-6 mb-4">
                                            <div className="card border-left-primary shadow h-100 py-2 card bg-primary text-white shadow">
                                                <div className="card-body ">
                                                    <div className="row no-gutters align-items-center">

                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold  text-uppercase mb-1">
                                                                <br />
                                                                Số lượng ly</div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{soluonglytheongay} ly</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                            {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-xl-6 col-md-6 mb-4">

                                            <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                                <br />
                                                                Doanh thu </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{dthutheongay.toLocaleString()} VNĐ</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col col-6">
                                    <div className="row thongke-date">
                                        <div className="text-xs font-weight-bold  text-uppercase mb-1">

                                            Số lượng và Doanh thu theo tháng</div>

                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-md-6 mb-4">
                                            <div className="card border-left-primary shadow h-100 py-2 card bg-primary text-white shadow">
                                                <div className="card-body ">
                                                    <div className="row no-gutters align-items-center">

                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold  text-uppercase mb-1">
                                                                <br />
                                                                Số lượng ly</div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{soluonglytheothang} ly</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                            {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-xl-6 col-md-6 mb-4">

                                            <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                                <br />
                                                                Doanh thu </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{dthutheothang.toLocaleString()} VNĐ</div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary"> <h4 style={{ color: "blue" }}> Thống kê số lượng bán ra</h4></h6>

                                        </div>

                                        <div className="card-body">
                                            <div className="chart-area">
                                                <div className="App" style={{ paddingTop: "10px" }}>

                                                    <div className='row' style={{ verticalAlign: "middle", textAlign: "center" }}>

                                                        <div className='col-4 pading'>
                                                            Thời gian thống kê
                                                        </div>
                                                        <div className='col-3'>
                                                            <select className="form-control" onChange={(event) => changeloai(event)} value={loai} >

                                                                <option value='1'  >Ngày</option>
                                                                <option value='2'  >Tháng</option>
                                                                <option value='3'  >Năm</option>
                                                            </select>
                                                        </div>
                                                        <div className='col-3 pading'>{
                                                            loai == 1 ?
                                                                <input type="date" className="form-control  " value={ngay} onChange={(e) => changengay(e)} /> :
                                                                loai == 2 ?
                                                                    <>
                                                                        <div className='row'>
                                                                            <div className="col col-lg-6">  <select className="form-control" onChange={(event) => changethang(event)} value={thang} >
                                                                                <option value='1'  >Tháng 1</option>
                                                                                <option value='2'  >Tháng 2</option>
                                                                                <option value='3'  >Tháng 3</option>
                                                                                <option value='4'  >Tháng 4</option>
                                                                                <option value='5'  >Tháng 5</option>
                                                                                <option value='6'  >Tháng 6</option>
                                                                                <option value='7'  >Tháng 7</option>
                                                                                <option value='8'  >Tháng 8</option>
                                                                                <option value='9'  >Tháng 9</option>
                                                                                <option value='10'  >Tháng 10</option>
                                                                                <option value='11'  >Tháng 11</option>
                                                                                <option value='12'  >Tháng 12</option>
                                                                            </select></div>
                                                                            <div className="col col-lg-6">  <select className="form-control" onChange={(event) => changenam(event)} value={year} >
                                                                                <option value='' hidden >{year}</option>
                                                                                {
                                                                                    listyear && listyear.length > 0 &&
                                                                                    listyear.map((item, index) => {
                                                                                        return (
                                                                                            <option key={index} value={item}>{item}</option>
                                                                                        )
                                                                                    })



                                                                                }
                                                                            </select></div>
                                                                        </div>


                                                                    </>
                                                                    :
                                                                    <select className="form-control" onChange={(event) => changenam(event)} value={year} >
                                                                        <option value='' hidden >{year}</option>
                                                                        {
                                                                            listyear && listyear.length > 0 &&
                                                                            listyear.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item}>{item}</option>
                                                                                )
                                                                            })



                                                                        }
                                                                    </select>
                                                        }

                                                        </div>
                                                        <div className='col-2 pading'>
                                                            <button className="btn btn-primary" onClick={() => xem()}>Xem</button>
                                                        </div>
                                                    </div>
                                                    <Bar

                                                        data={{
                                                            labels: label,
                                                            datasets: [

                                                                // {
                                                                //     label: "Số lượng bán ra",

                                                                //     borderWidth: 1,

                                                                //     data: soluong
                                                                // }, 
                                                                {
                                                                    label: "Số lượng bán",
                                                                    backgroundColor: [
                                                                        "rgba(255, 99, 132, 0.2)",
                                                                        "rgba(54, 162, 235, 0.2)",
                                                                        "rgba(255, 206, 86, 0.2)",
                                                                        "rgba(75, 192, 192, 0.2)",
                                                                        "rgba(153, 102, 255, 0.2)",
                                                                        "rgba(255, 159, 64, 0.2)"
                                                                    ], borderColor: [
                                                                        "rgba(255, 99, 132, 1)",
                                                                        "rgba(54, 162, 235, 1)",
                                                                        "rgba(255, 206, 86, 1)",
                                                                        "rgba(75, 192, 192, 1)",
                                                                        "rgba(153, 102, 255, 1)",
                                                                        "rgba(255, 159, 64, 1)"
                                                                    ],
                                                                    borderWidth: 1,

                                                                    data: soluongban
                                                                }

                                                            ]
                                                        }}
                                                        plugins={[ChartDataLabels]}
                                                        options={{
                                                            plugins: {
                                                                datalabels: {
                                                                    display: true,
                                                                    font: {
                                                                        size: 14,
                                                                        weight: 'bold'
                                                                    },
                                                                    color: "black",

                                                                    formatter: Math.round,

                                                                    offset: -20,
                                                                    align: "start"
                                                                }
                                                                ,
                                                                legend: { display: false }
                                                            },
                                                            legend: { display: false },
                                                            title: {
                                                                display: true,
                                                                text: "Predicted world population (millions) in 2050"
                                                            }
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    !infirebase && (
                                        <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary"> <h4 style={{ color: "blue" }}> Thống kê hàng tồn kho </h4></h6>
    
                                            </div>
    
                                            <div className="card-body">
                                                <div className="chart-area">
                                                    <div className="App" style={{ paddingTop: "10px" }}>
    
                                                        {/* <div className='row' style={{ verticalAlign: "middle", textAlign: "center" }}>
                                                            <div className='col-3'>
    
                                                            </div>
                                                            <div className='col-3 pading'>
                                                                Chọn năm
                                                            </div>
                                                            <div className='col-2'>
    
                                                            </div>
    
                                                        </div> */}
                                                        <Bar
    
                                                            data={{
                                                                labels: labelget,
                                                                datasets: [
    
                                                                    {
                                                                        label: "Số lượng tồn kho",
    
                                                                        borderWidth: 1,
    
                                                                        data: soluongkho
                                                                    },
                                                                    // {
                                                                    //     label: "Lợi nhuận",
    
                                                                    //     borderWidth: 1,
    
                                                                    //     data: loinhuan
                                                                    // }
                                                                ]
                                                            }}
                                                            plugins={[ChartDataLabels]}
                                                            options={{
                                                                plugins: {
                                                                    datalabels: {
                                                                        display: true,
                                                                        font: {
                                                                            size: 14,
                                                                            weight: 'bold'
                                                                        },
                                                                        color: "black",
    
                                                                        formatter: Math.round,
    
                                                                        offset: -20,
                                                                        align: "start"
                                                                    }
                                                                    ,
                                                                    legend: { display: false }
                                                                },
                                                                legend: { display: false },
                                                                title: {
                                                                    display: true,
                                                                    text: "Predicted world population (millions) in 2050"
                                                                }
                                                            }}
                                                        />
    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
}
                               
                                {
                                    tongban > 0 && (
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="card shadow mb-4">
                                                <div
                                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                    <h6 className="m-0 font-weight-bold text-primary"> <h4 style={{ color: "blue" }}> Thống kê doanh thu </h4></h6>

                                                </div>

                                                <div className="card-body">
                                                    <div className="chart-area">
                                                        <div className="App" style={{ paddingTop: "10px" }}>

                                                            <Pie

                                                                data={{
                                                                    datasets: [

                                                                        {

                                                                            borderWidth: 1,

                                                                            data: [tongban, tonhko]
                                                                        },
                                                                        // {
                                                                        //     label: "Lợi nhuận",

                                                                        //     borderWidth: 1,

                                                                        //     data: loinhuan
                                                                        // }
                                                                    ],
                                                                    labels: [


                                                                        'Bán ra',
                                                                        'Tồn kho'
                                                                    ]
                                                                }}
                                                                options={{
                                                                    plugins: {
                                                                        datalabels: {
                                                                            display: true,
                                                                            font: {
                                                                                size: 14,
                                                                                weight: 'bold'
                                                                            },
                                                                            color: "black",

                                                                            formatter: Math.round,

                                                                            offset: -20,
                                                                            align: "start"
                                                                        }
                                                                        ,
                                                                        legend: { display: false }
                                                                    },
                                                                    legend: { display: false },
                                                                    title: {
                                                                        display: true,
                                                                        text: "Predicted world population (millions) in 2050"
                                                                    }
                                                                }}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }

                            </div>







                        </div>
                    </div>

                </div>
            </main>
        </>

    );
}



export default Thongke;