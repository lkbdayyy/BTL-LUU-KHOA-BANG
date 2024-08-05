document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('flight-search-form');
    const resultsContainer = document.getElementById('results-container');
    const bookingForm = document.getElementById('book-flight-form');
    const bookingReviewSection = document.getElementById('booking-review');
    const reviewContainer = document.getElementById('review-container');
    const confirmBookingButton = document.getElementById('confirm-booking');
    const cancelBookingButton = document.getElementById('cancel-booking');

    
    const cities = [
        'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Huế', 'Vinh',
        'Pleiku', 'Buôn Ma Thuột', 'Tuy Hòa', 'Phú Quốc', 'Rạch Giá', 'Côn Đảo', 'Thanh Hóa', 'Lao Cai'
    ];

    
    const departureCities = document.getElementById('departure-cities');
    const destinationCities = document.getElementById('destination-cities');

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        departureCities.appendChild(option);
        destinationCities.appendChild(option.cloneNode(true));
    });

    // Dữ liệu chuyến bay 
    const flights = [
        // Hà Nội
        { id: 1, flightNumber: 'VN101', departure: 'Hà Nội', destination: 'Hồ Chí Minh', departureTime: '08:00', arrivalTime: '10:30', price: '1,200,000 VNĐ' },
        { id: 2, flightNumber: 'VN102', departure: 'Hà Nội', destination: 'Đà Nẵng', departureTime: '12:00', arrivalTime: '14:00', price: '1,000,000 VNĐ' },
        { id: 3, flightNumber: 'VN103', departure: 'Hà Nội', destination: 'Nha Trang', departureTime: '15:00', arrivalTime: '17:00', price: '1,500,000 VNĐ' },
        { id: 4, flightNumber: 'VN104', departure: 'Hà Nội', destination: 'Cần Thơ', departureTime: '19:00', arrivalTime: '21:30', price: '1,800,000 VNĐ' },

        // Hồ Chí Minh
        { id: 5, flightNumber: 'VN105', departure: 'Hồ Chí Minh', destination: 'Đà Nẵng', departureTime: '09:00', arrivalTime: '11:00', price: '1,200,000 VNĐ' },
        { id: 6, flightNumber: 'VN106', departure: 'Hồ Chí Minh', destination: 'Nha Trang', departureTime: '13:00', arrivalTime: '14:00', price: '1,000,000 VNĐ' },
        { id: 7, flightNumber: 'VN107', departure: 'Hồ Chí Minh', destination: 'Phú Quốc', departureTime: '17:00', arrivalTime: '18:00', price: '1,200,000 VNĐ' },
        { id: 8, flightNumber: 'VN108', departure: 'Hồ Chí Minh', destination: 'Côn Đảo', departureTime: '21:00', arrivalTime: '22:00', price: '1,500,000 VNĐ' },

        // Đà Nẵng
        { id: 9, flightNumber: 'VN109', departure: 'Đà Nẵng', destination: 'Hải Phòng', departureTime: '10:00', arrivalTime: '12:00', price: '1,200,000 VNĐ' },
        { id: 10, flightNumber: 'VN110', departure: 'Đà Nẵng', destination: 'Pleiku', departureTime: '14:00', arrivalTime: '15:00', price: '1,000,000 VNĐ' },
        { id: 11, flightNumber: 'VN111', departure: 'Đà Nẵng', destination: 'Buôn Ma Thuột', departureTime: '16:00', arrivalTime: '17:00', price: '1,200,000 VNĐ' },

        // Hải Phòng
        { id: 12, flightNumber: 'VN112', departure: 'Hải Phòng', destination: 'Huế', departureTime: '09:00', arrivalTime: '10:30', price: '1,200,000 VNĐ' },

        // Cần Thơ
        { id: 13, flightNumber: 'VN113', departure: 'Cần Thơ', destination: 'Nha Trang', departureTime: '12:00', arrivalTime: '13:30', price: '1,800,000 VNĐ' },

        // Nha Trang
        { id: 14, flightNumber: 'VN114', departure: 'Nha Trang', destination: 'Rạch Giá', departureTime: '18:00', arrivalTime: '19:00', price: '1,500,000 VNĐ' },

        // Thanh Hóa
        { id: 15, flightNumber: 'VN115', departure: 'Thanh Hóa', destination: 'Lao Cai', departureTime: '08:00', arrivalTime: '09:30', price: '1,300,000 VNĐ' },

        // Lao Cai
        { id: 16, flightNumber: 'VN116', departure: 'Lao Cai', destination: 'Hồ Chí Minh', departureTime: '14:00', arrivalTime: '17:00', price: '1,600,000 VNĐ' },
    ];

    // Tìm kiếm chuyến bay
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const departure = document.getElementById('departure').value;
        const destination = document.getElementById('destination').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const flightClass = document.getElementById('flight-class').value;
        const minPrice = parseInt(document.getElementById('min-price').value.replace(/[^0-9]/g, '')) || 0;
        const maxPrice = parseInt(document.getElementById('max-price').value.replace(/[^0-9]/g, '')) || Infinity;

        // Lọc kết quả chuyến bay
        const filteredFlights = flights.filter(flight => 
            flight.departure.toLowerCase().includes(departure.toLowerCase()) &&
            flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
            flight.price.replace(/[^0-9]/g, '') >= minPrice &&
            flight.price.replace(/[^0-9]/g, '') <= maxPrice
        );

        resultsContainer.innerHTML = filteredFlights.length > 0 ? 
            filteredFlights.map(flight => `
                <div class="flight">
                    <h3>Chuyến bay ${flight.flightNumber}</h3>
                    <p>Điểm khởi hành: ${flight.departure}</p>
                    <p>Điểm đến: ${flight.destination}</p>
                    <p>Giờ khởi hành: ${flight.departureTime}</p>
                    <p>Giờ đến: ${flight.arrivalTime}</p>
                    <p>Giá: ${flight.price}</p>
                    <button data-flight-id="${flight.id}" class="book-flight-btn">Đặt Vé</button>
                </div>
            `).join('') : '<p>Không tìm thấy chuyến bay phù hợp.</p>';

        document.querySelectorAll('.book-flight-btn').forEach(button => {
            button.addEventListener('click', function () {
                const flightId = this.getAttribute('data-flight-id');
                showBookingReview(flightId);
            });
        });
    });

    function showBookingReview(flightId) {
        
        const flight = flights.find(f => f.id == flightId);
        
        reviewContainer.innerHTML = `
            <h3>Thông tin chuyến bay</h3>
            <p>Chuyến bay: ${flight.flightNumber}</p>
            <p>Điểm khởi hành: ${flight.departure}</p>
            <p>Điểm đến: ${flight.destination}</p>
            <p>Giờ khởi hành: ${flight.departureTime}</p>
            <p>Giờ đến: ${flight.arrivalTime}</p>
            <p>Giá: ${flight.price}</p>
            <h4>Thông tin người đặt vé</h4>
            <p>Họ và tên: <span id="review-full-name">${document.getElementById('full-name').value}</span></p>
            <p>Số hộ chiếu: <span id="review-passport-number">${document.getElementById('passport-number').value}</span></p>
            <p>Email: <span id="review-email">${document.getElementById('email').value}</span></p>
            <p>Số điện thoại: <span id="review-phone">${document.getElementById('phone').value}</span></p>
            <p>Phương thức thanh toán: <span id="review-payment-method">${document.getElementById('payment-method').value}</span></p>
        `;
        
        confirmBookingButton.addEventListener('click', function () {
            alert('Vé của bạn đã được đặt thành công!');
            bookingReviewSection.style.display = 'none';
        });
        
        cancelBookingButton.addEventListener('click', function () {
            bookingReviewSection.style.display = 'none';
        });

        bookingReviewSection.style.display = 'block';
    }

    
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const selectedFlight = document.querySelector('.book-flight-btn');
        if (selectedFlight) {
            const flightId = selectedFlight.getAttribute('data-flight-id');
            showBookingReview(flightId);
        }
    });
});
