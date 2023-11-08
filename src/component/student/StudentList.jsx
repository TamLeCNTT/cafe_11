import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../layout/Header'
import StudentService from '../../service/StudentService'
import io from "socket.io-client";
const StudentList = () => {
    
    const [list, setlist] = useState([])
    const addStudentByImport = (listStudent) => {
        toast.success("you have click me!")
        StudentService.update({ name: "tama", pass: "tam" }).then(
            ress => {
                StudentService.getAll().then(res => {
                    let ab = Object.values(res.data)
                    console.log(ab)
                    setlist(ab)
                })
            }
        )



    }
    useEffect(() => {
        StudentService.getAll().then(res => {
            let ab = Object.values(res.data)
            console.log(ab)
            setlist(ab)
        })
       
    }, [])



    return (
        <>
            <Header />
            <input type='button' value={"click me!"} onClick={(e) => addStudentByImport(e)} />
            <div>StudentList</div>
            {
                list.map((item, index) => {
                    return (
                        <li>
                            {item.name}
                        </li>
                    )
                })
            }
        </>

    )
}

export default StudentList