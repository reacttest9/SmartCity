import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Keyboard,
    Alert,
    Platform,
    Text,
    TouchableOpacity,
} from 'react-native';
import RNPaystack from "react-native-paystack"

// Resorces
import axios from 'axios';
import { getNumbersOnly, getScreenHeight } from '../utils/domUtils';
import CustomTextInput from '../components/CustomTextInput';

const PaystackStack = props => {

    useLayoutEffect(() => {
        RNPaystack.init({ publicKey: 'pk_test_50e1737ad50eb8aaee946aa252a8de47f39616c5' });
    }, [])


    const [cardNo, setCardNo] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [cvv, setCvv] = useState("")
    const [verifyLoading, setVerifyLoading] = useState(false);

    const cardRef: any = useRef()
    const monthRef: any = useRef()
    const yearRef: any = useRef()
    const cvvRef: any = useRef()

    const handler = () => {
        const data = {
            visible: true,
            type: 0,
            message: '',
            duretion: 0,
        };


        chargeCard()
    };

    const verifyTransaction = (reference: any) => {
        setVerifyLoading(true);
        var config = {
            method: 'get',
            url: `https://api.paystack.co/transaction/verify/${reference}`,
            headers: {
                Authorization:
                    'Bearer sk_test_c56680f5714eed0b3ceee17c0efe6171bb9fe4e9',
                'Content-Type': 'application/javascript',
            },
        };

        axios(config)
            .then(function (response) {
                if (response.data.status) {
                    console.log(response.data.data.authorization)
                    // goBack();
                    // onPayBtnPressHandler();
                    
                    Alert.alert("Success");
                }
            })
            .catch(function (error) {
                if (error.code === 'ERR_BAD_REQUEST') {
                    Alert.alert('Can not initial the transaction');
                }
            })
            .finally(function () {
                setVerifyLoading(false);
            });
    };


  

    function chargeCard() {
        setVerifyLoading(true)
        RNPaystack.chargeCard({
            cardNumber: cardNo,
            expiryMonth: month,
            expiryYear: year,
            cvc: cvv,
            email: "demo@gmail.com",
            amountInKobo: parseFloat(10) * 100,
            currency: "GHS"
            // subAccount: 'ACCT_pz61jjjsslnx1d9',
        })
            .then(response => {
                console.log(response); // card charged successfully, get reference here
                verifyTransaction(response.reference)
            })
            .catch(error => {
                console.log(">>>",error); // error is a javascript Error object
                console.log(error.message);
                Alert.alert(error.message)
                console.log(error.code);
            }).finally(() => {
                setVerifyLoading(false)
            })

    }


    return (
        <>
            <View style={{ flex: 1, backgroundColor: "grey" }}>
               

                <View style={styles.contanier}>

                        <View style={styles.customTextInput}>
                            <CustomTextInput
                                keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                                maxLength={16}
                                placeholder={"card number"}
                                value={cardNo}
                                action={(text) => setCardNo(getNumbersOnly(text))}
                                inputRef={cardRef}
                                type="next"
                                onSubmit={() => {
                                    monthRef.current.focus();
                                }}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.customTextInput, { width: "45%" }]}>
                                <CustomTextInput
                                    keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                                    maxLength={2}
                                    placeholder={"month"}
                                    value={month}
                                    action={(text) => setMonth(getNumbersOnly(text))}
                                    inputRef={monthRef}
                                    type="next"
                                    onSubmit={() => {
                                        yearRef.current.focus();
                                    }}
                                />
                            </View>


                            <View style={[styles.customTextInput, { width: "45%" }]}>
                                <CustomTextInput
                                    keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                                    maxLength={2}
                                    placeholder={"year"}
                                    value={year}
                                    action={(text) => setYear(getNumbersOnly(text))}
                                    inputRef={yearRef}
                                    type="next"
                                    onSubmit={() => {
                                        cvvRef.current.focus();
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.customTextInput}>
                            <CustomTextInput
                                keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                                maxLength={3}
                                placeholder={"CVV"}
                                value={cvv}
                                action={(text) => setCvv(getNumbersOnly(text))}
                                inputRef={cvvRef}
                                secure={true}
                                type="done"
                                onSubmit={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                        </View>

                        <TouchableOpacity
                        onPress={handler}
                        style={[styles.customTextInput, {alignSelf: "center"}]}>
                            <Text >MAKE PAYMENT</Text>
                        </TouchableOpacity>
                       
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    },
    logo: {
        height: getScreenHeight(25),
        width: getScreenHeight(25),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: getScreenHeight(5),
    },
    title: {
        color: "black",
        fontSize: getScreenHeight(2.2),
        marginVertical: getScreenHeight(2),
    },
    contanier: {
        paddingHorizontal: getScreenHeight(2),
    },
    customTextInput: {
        marginBottom: getScreenHeight(2),
    },
    keyboard: {
        flex: 1, marginTop: -getScreenHeight(4)
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    subtitle: {
        fontSize: getScreenHeight(1.8),
        alignSelf: "center",
        color: "black"

    },
    item: {
        backgroundColor: "white",
        padding: getScreenHeight(2),
        marginTop: getScreenHeight(2),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: getScreenHeight(1)
    },
    brand: {
        fontSize: getScreenHeight(2.5),
        color: "black",
    },
    icon: {
        height: getScreenHeight(2),
        width: getScreenHeight(2)
    }
});

export default PaystackStack;
