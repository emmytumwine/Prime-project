const express = require('express');
const path = require('path');
const sql = require('mssql');

const dbConfig = {
  server: 'EMMY',
  database: 'prime',
  user: 'sa',
  password: 'emmy',
  options: {
    trustServerCertificate: true,
  },
};

const familyPool = new sql.ConnectionPool(dbConfig);
const educationPool = new sql.ConnectionPool(dbConfig);
const customerPool = new sql.ConnectionPool(dbConfig);
const villagePool = new sql.ConnectionPool(dbConfig);
const economicsPool = new sql.ConnectionPool(dbConfig);
const occupationPool = new sql.ConnectionPool(dbConfig);

async function connect(pool) {
  try {
    if (!pool.connected) {
      await pool.connect();
      console.log('Connected to SQL Server');
    }
  } catch (error) {
    console.error('Failed to connect to SQL Server:', error.message);
  }
}

const app = express();
const port = 3000;

app.use(express.static('page'));
app.use(express.urlencoded({ extended: true }));

// Family project routes
app.get('/family/data', async (req, res) => {
  try {
    const categoryType = req.query.categoryType;

    await connect(familyPool);

    const query = `
      SELECT PolicyholderSumInsured, SpouseSumInsured, KidsSumInsured, ParentSumInsured, FuneralAmount, HospitalAmount, DriverEmergencyAmount
      FROM family_insurance
      WHERE CategoryType LIKE '%' + @categoryType + '%'
    `;

    const result = await familyPool.request()
      .input('categoryType', sql.NVarChar, categoryType)
      .query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json({ error: 'No data found for the selected category type.' });
      return;
    }

    const data = result.recordset[0];
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/family/additionalData', async (req, res) => {
  try {
    const categoryType = req.query.categoryType;

    await connect(familyPool);

    const query = `
      SELECT MonthlyPremium, AnnualyPremium, MonthlyMinSavings, AnnualyMinSavings, MonthlyAddPremium, AnnualyAddPremium, MonthlyAddPmParent, BaseKids
      FROM family_insurance
      WHERE CategoryType LIKE '%' + @categoryType + '%'
    `;


    const result = await familyPool.request()
      .input('categoryType', sql.NVarChar, categoryType)
      .query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json({ error: 'No additional data found for the selected category type.' });
      return;
    }

    const additionalData = result.recordset[0];
    res.json(additionalData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching additional data.' });
  }
});

app.get('/family/categoryTypes', async (req, res) => {
  try {
    await connect(familyPool);

    const query = `
      SELECT DISTINCT CategoryType
      FROM family_insurance
    `;

    const result = await familyPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json({ error: 'No category types found.' });
      return;
    }

    const categoryTypes = result.recordset.map(record => record.CategoryType);
    res.json(categoryTypes);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching category types.' });
  }
});

// Education project routes
app.get('/education/Ages', async (req, res) => {
  try {
    await connect(educationPool);

    const query = `
      SELECT DISTINCT Age
      FROM [education-table]
      ORDER BY Age ASC
    `;

    const result = await educationPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const ages = result.recordset.map(record => record.Age);
    res.json(ages);
    // Education project data fetching logic
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching Ages.' });
  }
});

app.get('/education/premiumFrequencies', async (req, res) => {
  try {
    await connect(educationPool);

    const query = `
      SELECT DISTINCT [Premium_Frequency] AS PremiumFrequency
      FROM [education-table]
      ORDER BY [Premium_Frequency] ASC
    `;

    const result = await educationPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const premiumFrequencies = result.recordset.map(record => record.PremiumFrequency);
    res.json(premiumFrequencies);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching premium frequencies.' });
  }
});

app.get('/education/benefitYears', async (req, res) => {
  try {
    await connect(educationPool);

    const query = `
      SELECT DISTINCT [Benefit_Years] AS BenefitYears
      FROM [education-table]
      ORDER BY [Benefit_Years] ASC
    `;

    const result = await educationPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const benefitYears = result.recordset.map(record => record.BenefitYears);
    res.json(benefitYears);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching Benefit Years.' });
  }
});

app.get('/education/contributionYears', async (req, res) => {
  try {
    await connect(educationPool);

    const query = `
      SELECT DISTINCT [Contribution_Years] AS ContributionYears
      FROM [education-table]
      ORDER BY [Contribution_Years] ASC
    `;

    const result = await educationPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const contributionYears = result.recordset.map(record => record.ContributionYears);
    res.json(contributionYears);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching Contribution Years.' });
  }
});

app.get('/education/ratePerMille', async (req, res) => {
  try {
    const { age, premiumFrequency, contributionYears, benefitYears } = req.query;

    await connect(educationPool);

    const query = `
      SELECT [Rate_Per_Mille]
      FROM [education-table]
      WHERE [Age] = @age
        AND [Premium_Frequency] = @premiumFrequency
        AND [Contribution_Years] = @contributionYears
        AND [Benefit_Years] = @benefitYears
    `;

    const result = await educationPool.request()
      .input('age', sql.NVarChar, age)
      .input('premiumFrequency', sql.NVarChar, premiumFrequency)
      .input('contributionYears', sql.NVarChar, contributionYears)
      .input('benefitYears', sql.NVarChar, benefitYears)
      .query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json({ ratePerMille: null });
      return;
    }

    const ratePerMille = result.recordset[0].Rate_Per_Mille;
    res.json({ ratePerMille });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching Rate_Per_Mille.' });
  }
});


// Define a route to fetch data for both Nationality and Residence forms
app.get('/customer/data', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT [Country_Description] AS Country_Description
      FROM [countries_table]
      ORDER BY [Country_Description] ASC
    `;

    const result = await customerPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const data = result.recordset.map(record => record.Country_Description);
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/customer/villages', async (req, res) => {
  try {
    await connect(villagePool);
    const query = `
      SELECT DISTINCT [Vilage_List_Description] AS Vilage_List_Description
      FROM [Rwanda_table]
      ORDER BY [Vilage_List_Description] ASC
    `;

    const result = await villagePool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const data = result.recordset.map(record => record.Vilage_List_Description);
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.get('/customer/economics', async (req, res) => {
  try {
    await connect(economicsPool);
    const query = `
      SELECT DISTINCT [ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC] AS ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC
      FROM [ECONOMIC_SUB_SECTOR_CODE_ISIC_TABLE]
      ORDER BY [ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC] ASC
    `;

    const result = await economicsPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const data = result.recordset.map(record => record.ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC);
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});
app.get('/customer/occupations', async (req, res) => {
  try {
    await connect(occupationPool);
    const query = `
      SELECT DISTINCT [Occupation_Description] AS Occupation_Description
      FROM [Occupation_table]
      ORDER BY [Occupation_Description] ASC
    `;

    const result = await occupationPool.request().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      res.json([]);
      return;
    }

    const data = result.recordset.map(record => record.Occupation_Description);
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});




// Define an async function to start the server and establish database connections
async function startServer() {
  try {
    // Create ConnectionPool instances for booking and registration databases
    const insertPool = new sql.ConnectionPool(dbConfig);

    // Connect to the databases
    await insertPool.connect();

    // Handle form submission for booking
    app.post('/customer_inf0o', async (req, res) => {
      try {
        const {
          customerName,
          surname,
          forename_1,
          forename_2,
          shortName,
          customerBranch,
          VisionSBU,
          CustomerOpenDate,
          arrivals,
          leaving,
        } = req.body;

        // Insert the user's details into the booking database
        const bookingRequest = bookingPool
          .request()
          .input('customerName', sql.VarChar, customerName)
          .select('surname', sql.VarChar, surname)
          .input('forename_1', sql.VarChar, forename_1)
          .input('forename_2', sql.VarChar, forename_2)
          .input('shortName', sql.VarChar, shortName)
          .input('customerBranch', sql.VarChar, customerBranch)
          .select('VisionSBU', sql.VarChar, VisionSBU)
          .input('CustomerOpenDate', sql.Date, CustomerOpenDate)
          .select('CustomerGender', sql.VarChar, CustomerGender)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .input('leaving', sql.Date, leaving)
          .query(
            'INSERT INTO booking_table ([First Name], [Last Name], Email, [National Id Or Passport], Phone, Address, [Location], [Members], [Arrival], [Leaving]) VALUES (@firstName, @lastName, @email, @number, @phone, @address, @location, @guests, @arrivals, @leaving)'
          );

        await bookingRequest;

        res.send('User details submitted successfully for booking.');
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during booking.');
      }
    });

    // Handle signup form submission for registration
    app.post('/signup', async (req, res) => {
      try {
        const {
          company_name,
          email_address,
          location,
          phone,
          username,
          password,
        } = req.body;

        // Hash the password before storing it in the registration database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the registration database
        const registrationRequest = registrationPool
          .request()
          .input('company_name', sql.NVarChar, company_name)
          .input('email_address', sql.NVarChar, email_address)
          .input('location', sql.NVarChar, location)
          .input('phone', sql.NVarChar, phone)
          .input('username', sql.NVarChar, username)
          .input('password', sql.NVarChar, hashedPassword)
          .query(
            'INSERT INTO Registration_table ([Company Name], [Email Address], Location, Phone, [User Name], Password) VALUES (@company_name, @email_address, @location, @phone, @username, @password)'
          );

        await registrationRequest;
        res.send('Registration went successfully!.');

      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during Registering.');
      }
    });
  } catch (error) {
    
  }
}

// Start the server
app.listen(port, () => {
  connect(familyPool).catch(console.error);
  connect(educationPool).catch(console.error);
  connect(customerPool).catch(console.error);
  console.log(`Combined Projects are running on http://localhost:${port}`);
});
