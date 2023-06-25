// import React from 'react'
// import { Helmet, useContext, useEffect, useState, Button, useNavigate, Store, CheckoutSteps, Form } from '../Imports'

// const ShippingAddressPage = () => {
//     const navigate = useNavigate();
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const {
//         fullBox,
//         userInfo,
//         cart: { shippingAddress },
//     } = state;
//     const [fullName, setFullName] = useState(shippingAddress.fullName || '');
//     const [address, setAddress] = useState(shippingAddress.address || '');
//     const [city, setCity] = useState(shippingAddress.city || '');
//     const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
//     const [country, setCountry] = useState(shippingAddress.country || '');
    
//     useEffect(() => {
//         if (!userInfo) {
//             navigate('/signin?redirect=/shipping');
//         }
//     }, [userInfo, navigate]);
    
//     const submitHandler = (e) => {
//         e.preventDefault();
//         ctxDispatch({ 
//             type: 'SAVE_SHIPPING_ADDRESS', 
//             payload: {
//                 fullName, 
//                 address, 
//                 city, 
//                 postalCode, 
//                 country, 
//                 location: 
//                 shippingAddress.location,
//             },
//         });

//         localStorage.setItem('shippingAddress', JSON.stringify({
//             fullName,
//             address,
//             city,
//             postalCode,
//             country,
//             location: shippingAddress.location,
//         }));

//         navigate('/payment');
//     };

//     useEffect(() => {
//         ctxDispatch({ type: 'SET_FULLBOX_OFF'});
//     }, [ctxDispatch, fullBox]);

  
  
  
//     return (
//     <div>
//         <Helmet>
//             <title>Shipping Address</title>
//         </Helmet>

//         <CheckoutSteps step1 step2></CheckoutSteps>
//         <div className='container small-container'>
//             <h1 className='my-3'>Shipping Address</h1>
//             <Form onSubmit={submitHandler}>
//                 <Form.Group className='mb-3' controlId='fullName'>
//                     <Form.Label>fullName</Form.Label>
//                     <Form.Control
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                     />                    
//                 </Form.Group>
//                 <Form.Group className='mb-3' controlId='address'>
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     required
//                     />
//                 </Form.Group>
//                 <Form.Group className='mb-3' controlId='city'>
//                     <Form.Label>City</Form.Label>
//                     <Form.Control
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     required
//                     />
//                 </Form.Group>
//                 <Form.Group className='mb-3' controlId='postalCode'>
//                     <Form.Label>Postal Code</Form.Label>
//                     <Form.Control
//                     value={postalCode}
//                     onChange={(e) => setPostalCode(e.target.value)}
//                     required
//                     />
//                 </Form.Group>
//                 <Form.Group className='mb-3' controlId='country'>
//                     <Form.Label>Country</Form.Label>
//                     <Form.Control
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     required
//                     />
//                 </Form.Group>
//                 <div className='mb-3'>                    
//                     <Button
//                     id="chooseOnMap"
//                     type="button"
//                     variant="light"
//                     onClick={() => navigate('/map')}
//                     >
//                         Choose Location On Map
//                     </Button>
//                     {shippingAddress.location && shippingAddress.location.lat ? (
//                         <div>
//                             LAT: {shippingAddress.location.lat}
//                             LNG: {shippingAddress.location.lng}
//                             </div>
//                     ) : (
//                         <div>No Location</div>
//                     )}
//                     </div>
                    
//                     <div className='mb-3'>
//                         <Button variant="primary" type="submit">
//                             Continue
//                         </Button>
//                     </div>                
//             </Form>
//         </div>
//     </div>
//   );
// }

// export default ShippingAddressPage