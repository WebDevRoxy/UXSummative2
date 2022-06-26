"use strict";

$(
    function globalFunction() {
        //global variables
        var peopleAmount = 0;
        var nightsAmount = 0;
        var maxPrice = 0;

        //accommodation data
        const data = {
            //min people, max people, price, min nights, max nights
            hotel: [1, 2, 157, 1, 5],
            hostel: [1, 1, 30, 1, 10],
            motel: [2, 4, 90, 3, 10],
            house: [1, 4, 240, 2, 15]
        }

        //calculation variables
        var availablePlaces;
        var availablePrice;
        var availableNights;

        //check people amount
        function calculatePlaces(data) {
            var placesData = {
                hotel: false,
                hostel: false,
                motel: false,
                house: false
            }

            //calculate people amount match
            if (peopleAmount >= data.hotel[0] && peopleAmount <= data.hotel[1]) {
                placesData.hotel = true;
            }

            if (peopleAmount >= data.hostel[0] && peopleAmount <= data.hostel[1]) {
                placesData.hostel = true;
            }

            if (peopleAmount >= data.motel[0] && peopleAmount <= data.motel[1]) {
                placesData.motel = true;
            }

            if (peopleAmount >= data.house[0] && peopleAmount <= data.house[1]) {
                placesData.house = true;
            }

            return placesData;
        }

        //calculate price range match
        function calculatePrice(data) {
            var priceData = {
                hotel: false,
                hostel: false,
                motel: false,
                house: false
            }

            if (data.hotel[2] <= maxPrice) {
                priceData.hotel = true;
            }

            if (data.hostel[2] <= maxPrice) {
                priceData.hostel = true;
            }

            if (data.motel[2] <= maxPrice) {
                priceData.motel = true;
            }

            if (data.house[2] <= maxPrice) {
                priceData.house = true;
            }

            return priceData;
        }

        //calculates nights
        function calculateNights(data) {
            var nightsData = {
                hotel: false,
                hostel: false,
                motel: false,
                house: false
            }

            if (nightsAmount >= data.hotel[3] && nightsAmount <= data.hotel[4]) {
                nightsData.hotel = true;
            }

            if (nightsAmount >= data.hostel[3] && nightsAmount <= data.hostel[4]) {
                nightsData.hostel = true;
            }

            if (nightsAmount >= data.motel[3] && nightsAmount <= data.motel[4]) {
                nightsData.motel = true;
            }

            if (nightsAmount >= data.house[3] && nightsAmount <= data.house[4]) {
                nightsData.house = true;
            }

            return nightsData;
        }

        //calculate if all values match a place
        function calculateAccommodation(availablePlaces, availablePrice, availableNights) {
            var accommodationAvailablity = {
                hotel: false,
                hostel: false,
                motel: false,
                house: false
            }

            if (availablePlaces.hotel === true && availablePrice.hotel === true && availableNights.hotel === true) {
                accommodationAvailablity.hotel = true;
            }

            if (availablePlaces.hostel === true && availablePrice.hostel === true && availableNights.hostel === true) {
                accommodationAvailablity.hostel = true;
            }

            if (availablePlaces.motel === true && availablePrice.motel === true && availableNights.motel === true) {
                accommodationAvailablity.motel = true;
            }

            if (availablePlaces.house === true && availablePrice.house === true && availableNights.house === true) {
                accommodationAvailablity.house = true;
            }

            return accommodationAvailablity;
        }

        $('#searchButton').click(function () {
            peopleAmount = document.getElementById('peopleInput').value.trim();
            nightsAmount = document.getElementById('nightsInput').value.trim();
            maxPrice = document.getElementById('maxPriceInput').value.trim();

            availablePlaces = calculatePlaces(data);
            availablePrice = calculatePrice(data);
            availableNights = calculateNights(data);

            var accommodationResults = calculateAccommodation(availablePlaces, availablePrice, availableNights);
            showAccommodationResults(accommodationResults);
        });

        //shows accommodation if it matches the search calculations
        function showAccommodationResults(accommodationResults) {
            $('#accommodationDisplayContainer').show();

            if (accommodationResults.hotel == true) {
                $('#hotel').show();
            }

            if (accommodationResults.hostel == true) {
                $('#hostel').show();
            }

            if (accommodationResults.motel == true) {
                $('#motel').show();
            }

            if (accommodationResults.house == true) {
                $('#house').show();
            }

            if (accommodationResults.hotel == false && accommodationResults.hostel == false && accommodationResults.motel == false && accommodationResults.house == false) {
                $('#nothingFound').show();
            }
        }

        //toggle
        $('#viewHotelButton').click(function () {
            $('#hotelModalSection').show();
            $('#userAccommodationPreferences').hide();
            $('#modalHotel').fadeIn(300); //change transition
            hotelMeals();

        })

        $('#viewHostelButton').click(function () {
            $('#hostelModalSection').show;
            $('#userAccommodationPreferences').hide;
        })

        $('#viewMotelButton').click(function () {
            $('#motelModalSection').show;
            $('#userAccommodationPreferences').hide;
        })

        $('#viewHouseButton').click(function () {
            $('#houseModalSection').show;
            $('#userAccommodationPreferences').hide;
        })

        //modal js

        //map api here

        //close modal
        $('#hotelBack').click(function () {
            $('#hotelModalSection').hide();
            $('#userAccommodationPreferences').show();
            $('#hotelModalSection').fadeIn(300);
        })


        //toggle hostel

        //toggle motel

        //toggle house

        //menus
        //hotel menu
        function hotelMeals() {
            var hotelBreakfast = ['French Toast', 'Waffles', 'Cereal'];
            var hotelLunch = ['Sandwiches', 'Hot Dogs'];
            var hotelDinner = ['Lasagna', 'Chicken Katsu', 'Pizza'];
            var ulBreakfast = '<ul>';
            var ulLunch = '<ul>';
            var ulDinner = '<ul>';

            //hotel breakfast
            hotelBreakfast.forEach(function (hotelBreakfast) {
                ulBreakfast += '<li>' + hotelBreakfast + '</li>';
            })
            ulBreakfast += '</ul';
            document.getElementById(hotelBreakfastContainer).innerHTML = ulBreakfast;

            //hotel lunch
            hotelLunch.forEach(function (hotelLunch) {
                ulLunch += '<li>' + hotelLunch + '</li>';
            })
            ulLunch += '</ul';
            document.getElementById(hotelLunchContainer).innerHTML = ulLunch;

            //hotel dinner
            hotelDinner.forEach(function (hotelDinner) {
                ulDinner += '<li>' + hotelDinner + '</li>';
            })
            ulDinner += '</ul';
            document.getElementById(hotelDinnerContainer).innerHTML = ulDinner;
        }

        //hostel menu

        //motel menu

        //house menu

        //go to booking form
        $('.modalBookButton').click(function () {
            $('#bookingPortal').show;
            $('#bookingPortal').fadeIn(300);
        })

        //submit booking form
        $('#submitButton').click(function () {
            validation()
        })

        function validation() {
            var firstName = document.getElementById('firstName').value.trim();
            var lastName = document.getElementById('lastName').value.trim();
            var email = document.getElementById('email').value.trim();
            var mobileNumber = document.getElementById('mobileNumber').value.trim();

            //validation for form CHANGE

            var bookingCheck = {
                firstName: false,
                lastName: false,
                email: false,
                mobileNumber: false,
            }

            if (firstName != '' && firstName != null) {
                bookingCheck.firstName = true;
            }

            if (lasttName != '' && lastName != null) {
                bookingCheck.lastName = true;
            }

            if (email != '' && email != null) {
                bookingCheck.email = true;
            }

            if (mobileNumber != '' && mobileNumber != null) {
                bookingCheck.mobileNumber = true;
            }

            function openConfirmation() {
                $('#bookingConfirmation').show(300);
            }

            if (bookingCheck.firstName === true && bookingCheck.lastName === true && bookingCheck.email === true && bookingCheck.mobileNumber === true) {
                openConfirmation()
            } else {
                //error message plugin
            }
        }

        //live validation, code from live validation library
        //live validate people input
        var validatedPeopleInput = new LiveValidation('peopleInput', { validMessage: "Valid!" });
        validatedPeopleInput.add(Validate.Presence); //validate if the input is not null
        validatedPeopleInput.add(Validate.Numericality, { onlyInteger: true }); //validate int

        //live validate nights input
        var validatedNightsInput = new LiveValidation('nightsInput', { validMessage: "Valid!" });
        validatedNightsInput.add(Validate.Presence); //validate if the input is not null
        validatedNightsInput.add(Validate.Numericality, { onlyInteger: true }); //validate int

        //live validate max price input
        var validatedPriceInput = new LiveValidation('maxPriceInput', { validMessage: "Valid!" });
        validatedPriceInput.add(Validate.Presence); //validate if the input is not null
        validatedPriceInput.add(Validate.Numericality, { onlyInteger: true }); //validate int

        //live validate first name input
        var validatedFirstNameInput = new LiveValidation('firstName', { validMessage: "Valid!" });
        validatedFirstNameInput.add(Validate.Presence); //validate if the input is not null
        validatedFirstNameInput.add(Validate.Format, { pattern: /^[a-zA-Z]+$/ }); //validate regex

        //live validate last name input
        var validatedLastNameInput = new LiveValidation('lastName', { validMessage: "Valid!" });
        validatedLastNameInput.add(Validate.Presence); //validate if the input is not null
        validatedLastNameInput.add(Validate.Format, { pattern: /^[a-zA-Z]+$/ }); //validate regex

    }
);
