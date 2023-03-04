import * as React from 'react';
import { connect } from 'react-redux';
import {
    Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody,
    ModalFooter, ModalHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
    Label, FormGroup, Input, Spinner, Collapse
} from 'reactstrap';
import { Occupation, Rating } from '../models/Classes'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import * as Helpers from '../helpers/DateTimeHelpers';

interface PremiumCalculatorProps{

}

interface PremiumCalculatorState {
    selectedOccupation: string,
    selectedRatingID: number,
    selectedFactor : number,
    selectedSumInsured: number,
    selectedName: string,
    occupations: Array<Occupation>,
    ratings: Array<Rating>,
    calculatedAge: number,    
    calculatedMonthlyPremium: number,
}

const ratinglist = [
    { ratingid: 1, rating: "Professional", factor: 1.0 },
    { ratingid: 2, rating: "White Collar", factor: 1.25 },
    { ratingid: 3, rating: "Light Manual", factor: 1.50 },
    { ratingid: 4, rating: "Heavy Manual", factor: 1.75 }
]

const occupationlist =  [
    {occupation:"-Select-", ratingid: 0},
    {occupation:"Cleaner", ratingid: 3},
    {occupation: "Doctor", ratingid: 1},
    {occupation: "Author", ratingid: 2},
    {occupation: "Farmer", ratingid: 4},
    {occupation: "Mechanic", ratingid: 4},
    {occupation: "Florist", ratingid: 3}    
]

const maxAge = 70;

class PremiumCalculator extends React.Component<PremiumCalculatorProps, PremiumCalculatorState> {
    constructor(props: PremiumCalculatorProps) {
        super(props);
        this.state = {
            selectedOccupation:"",
            selectedRatingID: 0,
            selectedFactor: 0,
            selectedSumInsured: 0,
            calculatedAge:0,
            calculatedMonthlyPremium:0,
            selectedName: "",                
            occupations: occupationlist,
            ratings: ratinglist,
        }
    }

    handleOccupationChange = (event: any) => {
            let occupationValue = occupationlist.filter(o => o.occupation == event.target.value)[0];
            let ratingValue = ratinglist.filter(r => r.ratingid == occupationValue.ratingid)[0];
            this.setState({
                selectedOccupation: occupationValue.occupation,                                       
                selectedRatingID: ratingValue.ratingid,
                selectedFactor : ratingValue.factor
            }, () => {
                this.calculatePremium();
            });
    }

    handleDateofBirthChange = (event: any) => {
        let dobValue = new Date(event.target.value);
        let currentDate = new Date();
        let ageValue = currentDate.getFullYear() - dobValue.getFullYear();
        if (ageValue > maxAge) {
            ageValue = 0;
        }
        this.setState({
            calculatedAge : ageValue
        });
    }

    handleSumInsuredChange = (event: any) => {
        let sumInsuredValue = event.target.value;
        this.setState({
            selectedSumInsured : sumInsuredValue
        })
    }

    calculateMinDate() : string {
        var date = new Date(); 
        date.setFullYear(date.getFullYear() - maxAge);
        console.log(Helpers.DateTimeHelpers.formatDate(date));
        return Helpers.DateTimeHelpers.formatDate(date);
    }

    calculatePremium()
    {
        if(this.state.selectedName.length <=0 )        
        {
            toast.error("Name is not provided");
        }
        else if(this.state.calculatedAge <=0 )        
        {
            toast.error("Invalid Date of Birth");
        }
        else if(this.state.selectedOccupation.length <= 0)
        {
            toast.error("Occupation is not selected");
        }
        else if(this.state.selectedSumInsured <= 0)
        {
            toast.error("Sum Insured is not provided");
        }
        else {
            let premiumValue : number = (this.state.selectedSumInsured * this.state.selectedFactor * this.state.calculatedAge)/1234;
            this.setState({
                calculatedMonthlyPremium : Number(premiumValue.toFixed(2))
            });
        }
        this.calculateMinDate();
    }


    render() {
        return (
            <div>
                <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        style={{ marginTop: "10px" }}
                />
                <Card style={{ marginTop: "50px" }}>
                    <CardHeader>
                        <h3>Premium Calculator</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Name</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <Input type="text" placeholder='Name' required
                                    onChange={(event: any) => {
                                        this.setState({
                                            selectedName: event.target.value        
                                        });
                                    }}
                                />
                            </Col>
                            <Col xs="12" sm="12" md="2" lg="2"/>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <span>{this.state.calculatedMonthlyPremium > 0 ?
                                    <h4>Monthy Premium : {this.state.calculatedMonthlyPremium}</h4>
                                : null }</span>
                            </Col>
                        </Row>        
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Age</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                            <Input type="text" disabled value={this.state.calculatedAge}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Date of Birth</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <Input 
                                    type="date" 
                                    onChange={this.handleDateofBirthChange.bind(this)}  
                                    min={this.calculateMinDate()}                                  
                                    //min="1953-02-03"                                  
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Occupation</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <Input type="select" placeholder='Select'
                                    onChange={this.handleOccupationChange.bind(this)}
                                >
                                    {this.state.occupations.map(item =>
                                        <option key={item.occupation}>{item.occupation}</option>)
                                    }
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" md="2" lg="2">
                                <Label htmlFor="select">Sum Insured</Label>
                            </Col>
                            <Col xs="12" sm="12" md="4" lg="4">
                                <Input type="number" onChange={this.handleSumInsuredChange.bind(this)}/>
                            </Col>
                        </Row>    
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.calculatePremium.bind(this)}>Calculate</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default PremiumCalculator;
