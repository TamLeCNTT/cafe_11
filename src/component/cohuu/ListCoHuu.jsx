import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Paginations from '../support/Paginations';
import Header from '../layout/Header';
import cohuuService from '../../service/cohuuService';
import './cohuu.scss'
const ListCoHuu = () => {

    let navitive = useNavigate()
    const [list, SetList] = useState([])

    const [lists, setLists] = useState([])

    const [ngay, setngay] = useState(new Date().toLocaleDateString('en-CA'));
    useEffect(() => {
        let today = new Date()
        let datenew = today.getFullYear() + "-" + (today.getMonth()) + "-" + (today.getDate())
        cohuuService.getbymonth(datenew).then(res => {
            console.log(res.data)
            SetList(res.data)
        })


    }, [])
    const getdate = (today) => {
        today = new Date(today)
        return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate())
    }
    const getlist = (e) => {
        setLists(e)

    }

    const save = (e) => {


    }
    const changengay = (e) => {

        setngay(e.target.value)
        let dates = new Date(e.target.value)
        var last = getdate(dates.getTime() + (6 * 24 * 60 * 60 * 1000));
        console.log(last)
        cohuuService.getbyhonngay(getdate(e.target.value)).then(res => {

            let listnew = res.data.filter(item => new Date(item.ngay).getTime() <= new Date(last).getTime())
            SetList(listnew)
        })
    }

    return (
        <>
            <Header />
            <main id="main" className="mains">
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <div className="container-fluid bang">

                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Danh sách thống kê km theo ngày</h6>
                                    </div>
                                    <div className="card-body">


                                        <div className="row ">
                                            <div className="col-lg-3">
                                                <input type="text" className="form-control form-controls" placeholder='Tìm kiếm' />
                                            </div>
                                            <div className="col-lg-5 ngaybd">
                                                <label>Ngày bắt đầu</label>
                                                <input type="date" className="form-control form-controls" value={ngay} onChange={(e) => changengay(e)} />
                                            </div>
                                        </div>



                                        {/* <NhapHang list={list} save={save} /> */}
                                        {/* 
                                                    <ImPort getdata={getdata} head={head} data={Data} name={"DanhSachHoSanPham"} /> */}



                                        <div className="table-responsive">
                                            <table className="table table-bordered product-table" id="dataTable" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Ngay</th>
                                                        <th>Tên giáo viên</th>
                                                        <th>Số xe</th>
                                                        <th>Lộ trình</th>

                                                        <th>Số km ngày</th>
                                                        <th>Số km đêm</th>
                                                        <th>Tổng số km </th>
                                                        {/* <th style={{ cursor: "pointer" }} onClick={() => sapxep(hinhthuc)}>Số lượng  {hinhthuc != null && hinhthuc == true && (<i class="fa fa-sort-up"></i>)} {hinhthuc != null && hinhthuc == false && (<i class="fa fa-sort-down"></i>)}</th> */}
                                                        <th>Quản lý</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        lists && lists.length > 0 &&
                                                        lists.map((item, index) => {
                                                            return (
                                                                <tr key={index} className='row-content'>
                                                                    <td>{item.ngay}</td>
                                                                    <td>{item.giaovien}</td>
                                                                    <td>{item.soxe}</td>


                                                                    <td>{item.lotrinh}</td>
                                                                    <td>{item.sokmngay}</td>
                                                                    <td>{item.sokmdem}</td>

                                                                    <td>{parseInt(item.sokmdem) + parseInt(item.sokmngay)}</td>
                                                                    <td>Xóa</td>


                                                                </tr>
                                                            )
                                                        })
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Paginations itemsPerPage={8} list={list} getlist={getlist} />

                        </div>




                    </div>


                </div>
            </main>




        </>
    )
}
export default ListCoHuu;