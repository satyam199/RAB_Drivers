import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from "react-native";
import externalstyle from '../styles/commonStyles'
import { useRoute } from "@react-navigation/native";
import { number } from "yup";

class VerifyOtp extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: true,
            mobile_no: "",
            country_code: "",
            country_iso: "",
            otp: "",
            isOtpValid: true,
        }
    }

    callApi = async () => {
        console.log(this.props.route.params,"new route")
        const { number } = this.props.route.params;
        
        console.log(number, "mmmnnnnnnnnnnn")
        // console.log("hellooooo", otp)
        let s1 = { ...this.state }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile_no: number, otp: this.state.otp })
        };
        console.log(requestOptions, "hiiii")
        // const postExample = async () => {
        try {
            const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/otp_verify', requestOptions);
            const data = await response.json();
            console.log(data)

            //  const data= JSON.stringify(response);
            if (data.status == 200) {
                this.props.navigation.navigate("Login")
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    submit = () => {
        if (this.state.otp.length < 1) {
            this.setState({ isOtpValid: false })
        } else {
            this.setState({ isOtpValid: true })
            this.callApi()
        }
    }

 

    render() {
        console.log("hellooooo", this.state.otp)
        // console.log(body, "hiii")
        return (
            <View style={externalstyle.container}>
                {/* <ScrollView> */}
                <StatusBar hidden={true} />
                <Image style={externalstyle.backgroundImage}
                    source={require('../../asets/icons/onbaord_bg.png')} />
                {/* header start........ */}
                <View style={externalstyle.header}>
                    <View style={externalstyle.forBackImage}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Verify")}>
                            <Image
                                style={externalstyle.backImage}
                                source={require('../../asets/icons/Group1417.png')} />

                        </TouchableOpacity>
                    </View>
                    <View style={externalstyle.headerText}>
                        {/* <Text style={exteErnalstyle.Headertitle}>Verify OTP</Text> */}
                    </View>
                </View>
                {/* header end...... */}
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: 20, marginBottom: 20, fontWeight: 'bold' }}>Verify OTP</Text>
                <Image
                    style={Style.logo}
                    source={require('../../asets/icons/verified.png')} />

                <Text style={Style.verify}>Verify OTP</Text>
                <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
                <Text style={externalstyle.label}>OTP</Text>
                <TextInput placeholder="Enter Code"
                    placeholderTextColor={"white"}
                    style={externalstyle.input}
                    value={this.state.otp}
                    keyboardType='numeric'
                    onChangeText={(otp) => this.setState({ otp })} />
                { this.state.isOtpValid ? null : <Text style={externalstyle.textValidation}>please enter otp code</Text>}

                <TouchableOpacity style={externalstyle.button} onPress={() => this.submit()}>
                    <Text style={externalstyle.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginHorizontal:120,
        // marginTop:0,
    },
    verify: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        // marginTop:30,
    },
    lorem: {
        color: "white",
        marginTop: 15,
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 20,
        marginBottom: 40,
    },
    time: {
        textAlign: "center",
        color: "white",
        marginTop: 20,
        fontSize: 16,
        marginVertical: 140,
        fontFamily: 'Roboto',
        opacity: 0.6,
    },
})

export default VerifyOtp