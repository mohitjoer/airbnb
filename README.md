# Cairbnb – An Airbnb Clone

Cairbnb is a full-stack web application that replicates the Airbnb experience. Built using Node.js, Express, MongoDB, and Bootstrap, Cairbnb provides a modern, responsive interface for users to browse, add, edit, and delete property listings.

## Features

- **Dynamic Property Listings:** Browse a wide variety of properties complete with images, descriptions, and pricing details.
- **CRUD Functionality:** Full Create, Read, Update, and Delete support for managing property listings.
- **Responsive Design:** Mobile-first design built with Bootstrap 5 and custom CSS for a seamless experience on any device.
- **MVC Architecture:** Clean separation of concerns using the Model-View-Controller pattern.
- **Templating with EJS:** Efficient view rendering using EJS and EJS-Mate for layouts and reusable components.
- **Database Integration:** Uses MongoDB with Mongoose ODM to manage property data.

## Tech Stack

- **Frontend:**
  - **EJS & EJS-Mate:** For templating and layouts.
  - **Bootstrap 5 & CSS3:** For styling and responsive design.
  - **Font Awesome:** For modern, scalable icons.

- **Backend:**
  - **Node.js & Express:** For server-side logic and routing.
  - **MongoDB & Mongoose:** For database management and modeling.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) installed and running locally

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mohitjoer/airbnb.git
   cd airbnb
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure MongoDB:**

   Ensure your MongoDB server is running. The application uses the following default connection string:

   ```
   mongodb://127.0.0.1:27017/cairbnb
   ```

   Adjust this in your source code if you need a different configuration.

4. **Seed the Database (Optional):**

   If you'd like to initialize the database with sample listings, run the seed script:

   ```bash
   cd init
   node index.js
   ```

   This script clears existing listings and inserts a collection of sample data defined in `data.js`.

5. **Start the Server:**

   Launch the server in development mode using nodemon:

   ```bash
   npm start
   ```

6. **Access the Application:**

   Open your browser and visit [http://localhost:3000](http://localhost:3000) to see Cairbnb in action.

## Project Structure

```
airbnb/
├── app.js                   # Main Express application file
├── models/
│   └── listing.js           # Mongoose schema and model for property listings
├── views/
│   ├── includes/            # Reusable UI components
│   │   ├── navbar.ejs       # Navigation bar (header)
│   │   └── footer.ejs       # Footer
│   ├── layout/
│   │   └── boilerplate.ejs  # Primary layout file (includes header, footer, and main container)
│   └── listings/            # Views related to property listings
│       ├── home.ejs         # Homepage with image gallery
│       ├── listing.ejs      # Overview page listing all properties
│       ├── new.ejs          # Form for creating a new listing
│       ├── show.ejs         # Detailed view of a single property
│       └── edit.ejs         # Form for editing a listing
├── public/
│   └── css/
│       └── style.css        # Custom CSS for styling Cairbnb
└── init/
    ├── data.js              # Sample listings data for seeding the database
    └── index.js             # Database seeding script
```

## Usage

- **Homepage:** Discover featured properties and enjoy an interactive image gallery.
- **Browse Listings:** Click “All listing” in the navbar to view every property available.
- **Add New Listing:** Use the “Add new listing” option to create a new property entry.
- **Manage Listings:** From a listing's detailed view, you can edit or delete the property.

## Code Highlights

### Mongoose Model (`models/listing.js`)
Defines the schema for a property listing with required fields such as title, description, price, location, and country. An image field includes a default URL to ensure a placeholder is always displayed.

### Seed Script (`init/index.js`)
Clears the existing listings and inserts sample data from `data.js` to quickly populate your database for testing or demo purposes.

## Contributing

Contributions are highly appreciated! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear, descriptive messages.
4. Open a pull request detailing your modifications.

For substantial changes, please open an issue first to discuss your ideas.

## License

This project is licensed under the [ISC License](https://choosealicense.com/licenses/isc/).

## Author

Mohit Joe .R

## Acknowledgments

- Inspired by Airbnb’s design and user experience.
- Property images are sourced from [Unsplash](https://unsplash.com).
```

You can save the above content in a file named `README.md` in your project directory.
