import * as React from 'react';
import { connect } from 'react-redux';
import {
    Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody,
    ModalFooter, ModalHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
    Label, FormGroup, Input, Spinner, Collapse
} from 'reactstrap';
import { Occupation, Rating } from '../models/Classes'

interface PremiumCalculatorProps{
}

interface PremiumCalculatorState {
    selectedOccupation: string,
    selectedRatingID: number,
    occupations: Array<Occupation>,
    ratings: Array<Rating>,
}

const ratinglist = [
    { ratingid: 1, rating: "Professional", factor: 1.0 },
    { ratingid: 2, rating: "White Collar", factor: 1.25 },
    { ratingid: 3, rating: "Light Manual", factor: 1.50 },
    { ratingid: 4, rating: "Heavy Manual", factor: 1.75 }
]

const occupationlist =  [
    {occupation:"Cleaner", ratingid: 3},
    {occupation: "Doctor", ratingid: 1},
    {occupation: "Author", ratingid: 2},
    {occupation: "Farmer", ratingid: 4},
    {occupation: "Mechanic", ratingid: 4},
    { occupation: "Florist", ratingid: 3}    
]

class PremiumCalculator extends React.Component<PremiumCalculatorProps, PremiumCalculatorState> {
    constructor(props: PremiumCalculatorProps) {
        super(props);
        this.state = {
            selectedOccupation:"",
            selectedRatingID: 0,
            occupations: occupationlist,
            ratings: ratinglist                
        }
    }

    handleOccupationChange = (occupation: Occupation) => {
        alert(occupation.occupation);
    }


    render() {
        return (
            <div>
                <Card style={{ marginTop: "50px" }}>
                    <CardHeader>
                        <h3>Premium Calculator</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Name</Label>
                            </Col>
                            <Col xs="12" sm="12" md="6" lg="6">
                                <input type="text"></input>
                            </Col>
                        </Row>        
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Age</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <input type="number" disabled></input>
                            </Col>
                        </Row>        
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Date of Birth</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <input type="date"></input>
                            </Col>
                        </Row>    
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Occupation</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <select onClick={()=> { this.handleOccupationChange.bind(this) }}>{
                                        this.state.occupations.map(item =>
                                        <option key={item.occupation}>{item.occupation}</option>)
                                }</select>;
                            </Col>
                        </Row>    
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Sum Insured</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <input type="number" disabled></input>
                            </Col>
                        </Row>        
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">Calculate</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default PremiumCalculator;
