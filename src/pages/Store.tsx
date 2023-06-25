import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json"
import StoreItem from "../components/StoreItem";
const Store = () =>{
    return(
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item=>(
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
        
    )
}

export default Store;

//md: medium screen size 2 column
//xs: small 1 col
//lg: large 3 col
//g-3 means gap of 3
//storeItem {...item} : ...item acts as a prop and take different items 