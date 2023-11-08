import React, { useRef,useEffect,useState } from 'react';
import ReactToPrint from 'react-to-print';

import { Content } from './Content';
import productService from '../../service/productService';

const Print = (props) => {
    const componentRef = useRef();
    const [data,setdata]=useState([])
    console.log(componentRef)
    const [listproduct, setListProduct] = useState([])
    useEffect(() => {
        productService.getall().then(res => {
            setListProduct(res.data)
           
          })
    },[])
    const setData = () => {
        console.log(props.content, props.id)
        productService.getall().then(res => {
            setListProduct(res.data)
           
          })
        setdata(props.content)
    }
    
    const handleBeforePrint=  () => {
        console.log("dd")
        props.OnclickCash()
    }
  
    return (
        <div onClick={()=>setData()}>
            <ReactToPrint  
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
                onAfterPrint={()=>handleBeforePrint()}
                
            />
            <div hidden>

                <Content ref={componentRef} content={props.content} listproduct={listproduct} />
            </div>
        </div>
    );
};
export default Print