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

            if (!LiveValidation.massValidate( [ validatedPeopleInput, validatedNightsInput, validatedPriceInput ] )) {
                return;
            }

            peopleAmount = $('#peopleInput').val().trim();
            nightsAmount = $('#nightsInput').val().trim();
            maxPrice = $('#maxPriceInput').val().trim();

            availablePlaces = calculatePlaces(data);
            availablePrice = calculatePrice(data);
            availableNights = calculateNights(data);

            //hide results before another search is made
            $('#hotel').hide();
            $('#hostel').hide();
            $('#motel').hide();
            $('#house').hide();
            $('#nothingFound').hide();
            $('#preSearchScreen').hide();

            var accommodationResults = calculateAccommodation(availablePlaces, availablePrice, availableNights);
            showAccommodationResults(accommodationResults);
        });

        //shows accommodation if it matches the search calculations
        function showAccommodationResults(accommodationResults) {
            $('#accommodationDisplayContainer').show();

            $('#preSearchScreen').hide();

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

        //toggle modals
        $('#viewHotelButton').click(function () {
            $('#hotelModalSection').show();
            $('#userAccommodationPreferences').hide();
            $('#modalHotel').fadeIn(300); //change transition
            hotelMeals();
        });

        $('#viewHostelButton').click(function () {
            $('#hostelModalSection').show();
            $('#userAccommodationPreferences').hide();
            $('#modalHostel').fadeIn(300); //change transition
            hostelMeals();
        });

        $('#viewMotelButton').click(function () {
            $('#motelModalSection').show();
            $('#userAccommodationPreferences').hide();
            $('#modalMotel').fadeIn(300); //change transition
            motelMeals();
        });

        $('#viewHouseButton').click(function () {
            $('#houseModalSection').show();
            $('#userAccommodationPreferences').hide();
            $('#modalHouse').fadeIn(300); //change transition
            houseMeals();
        });

        //close hotel modal
        $('#hotelBack').click(function () {
            $('#hotelModalSection').hide();
            $('#userAccommodationPreferences').show();
        });

        //close hostle modal
        $('#hostelBack').click(function () {
            $('#hostelModalSection').hide();
            $('#userAccommodationPreferences').show();
        });

        //close motel modal
        $('#motelBack').click(function () {
            $('#motelModalSection').hide();
            $('#userAccommodationPreferences').show();
        });

        //close house modal
        $('#houseBack').click(function () {
            $('#houseModalSection').hide();
            $('#userAccommodationPreferences').show();
        });


        //menus
        //hotel menu
        function hotelMeals() {
            var hotelBreakfast = ['French Toast', 'Waffles', 'Cereal'];
            var hotelLunch = ['Not Available'];
            var hotelDinner = ['Lasagna', 'Chicken Katsu', 'Pizza'];

            var ulBreakfast = '<ul>';
            var ulLunch = '<ul>';
            var ulDinner = '<ul>';

            //hotel breakfast
            hotelBreakfast.forEach(function (hotelBreakfast) {
                ulBreakfast += '<li>' + hotelBreakfast + '</li>';
            })
            ulBreakfast += '</ul>';
            $('#hotelBreakfastContainer').html(ulBreakfast);

            //hotel lunch
            hotelLunch.forEach(function (hotelLunch) {
                ulLunch += '<li>' + hotelLunch + '</li>';
            })
            ulLunch += '</ul>';
            $('#hotelLunchContainer').html(ulLunch);

            //hotel dinner
            hotelDinner.forEach(function (hotelDinner) {
                ulDinner += '<li>' + hotelDinner + '</li>';
            })
            ulDinner += '</ul>';
            $('#hotelDinnerContainer').html(ulDinner);
        }

        //hostel menu
        function hostelMeals() {
            var hostelBreakfast = ['Not Available'];
            var hostelLunch = ['Not Available'];
            var hostelDinner = ['Not Available'];

            var ulBreakfast = '<ul>';
            var ulLunch = '<ul>';
            var ulDinner = '<ul>';

            //hotel breakfast
            hostelBreakfast.forEach(function (hostelBreakfast) {
                ulBreakfast += '<li>' + hostelBreakfast + '</li>';
            })
            ulBreakfast += '</ul>';
            $('#hostelBreakfastContainer').html(ulBreakfast);

            //hotel lunch
            hostelLunch.forEach(function (hostelLunch) {
                ulLunch += '<li>' + hostelLunch + '</li>';
            })
            ulLunch += '</ul>';
            $('#hostelLunchContainer').html(ulLunch);

            //hotel dinner
            hostelDinner.forEach(function (hostelDinner) {
                ulDinner += '<li>' + hostelDinner + '</li>';
            })
            ulDinner += '</ul>';
            $('#hostelDinnerContainer').html(ulDinner);
        }

        //motel menu
        function motelMeals() {
            var motelBreakfast = ['Toast', 'Cereal'];
            var motelLunch = ['Not Available'];
            var motelDinner = ['Not Available'];

            var ulBreakfast = '<ul>';
            var ulLunch = '<ul>';
            var ulDinner = '<ul>';

            //motel breakfast
            motelBreakfast.forEach(function (motelBreakfast) {
                ulBreakfast += '<li>' + motelBreakfast + '</li>';
            })
            ulBreakfast += '</ul>';
            $('#motelBreakfastContainer').html(ulBreakfast);

            //motel lunch
            motelLunch.forEach(function (motelLunch) {
                ulLunch += '<li>' + motelLunch + '</li>';
            });
            ulLunch += '</ul>';
            $('#motelLunchContainer').html(ulLunch);

            //hotel dinner
            motelDinner.forEach(function (motelDinner) {
                ulDinner += '<li>' + motelDinner + '</li>';
            })
            ulDinner += '</ul>';
            $('#motelDinnerContainer').html(ulDinner);
        }

        //house menu
        function houseMeals() {
            var houseBreakfast = ['French Toast', 'Pancakes', 'Cereal'];
            var houseLunch = ['Sandwiches', 'Spagetti'];
            var houseDinner = ['BBQ Ribs', 'Seafood', 'Pizza'];

            var ulBreakfast = '<ul>';
            var ulLunch = '<ul>';
            var ulDinner = '<ul>';

            //hotel breakfast
            houseBreakfast.forEach(function (houseBreakfast) {
                ulBreakfast += '<li>' + houseBreakfast + '</li>';
            })
            ulBreakfast += '</ul>';
            $('#houseBreakfastContainer').html(ulBreakfast);

            //hotel lunch
            houseLunch.forEach(function (houseLunch) {
                ulLunch += '<li>' + houseLunch + '</li>';
            })
            ulLunch += '</ul>';
            $('#houseLunchContainer').html(ulLunch);

            //hotel dinner
            houseDinner.forEach(function (houseDinner) {
                ulDinner += '<li>' + houseDinner + '</li>';
            })
            ulDinner += '</ul>';
            $('#houseDinnerContainer').html(ulDinner);
        }

        //go to booking form
        $('.modalBookButton').click(function () {
            $('#bookingPortal').fadeIn(300);
        });

        $('#closeBookingPortal').click(function () {
            $('#bookingPortal').hide();
        });

        //submit booking form
        $('#submitButton').click(function () {
            $('#bookingPortal').hide();
            $('#bookingConfirmation').show();
        });

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
    }
);
