function searchCountry() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const filterSelect = document.getElementById('filterSelect').value;
    const url = `https://restcountries.com/v3.1/name/${searchInput}`;

    document.getElementById('loading').style.display = 'block';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('loading').style.display = 'none';
        displayResults(data, filterSelect);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('loading').style.display = 'none';
      });
  }

  function displayResults(countries, filter) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 

    countries.sort((a, b) => {
      const [sortBy, order] = filter.split('-');
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    countries.forEach(country => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${country.flags.svg}" alt="${country.name.common}" style="width: 50px; height: auto;"></td>
        <td>${country.name.common}</td>
        <td>${Object.keys(country.languages).join(', ')}</td>
        <td>${Object.keys(country.currencies).join(', ')}</td>
        <td>${country.population}</td>
        <td>${country.capital}</td>
        <td>${country.area}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function filterByCurrency(currencyCode) {
    fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data, 'name-asc');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function filterByLanguage(languageCode) {
    fetch(`https://restcountries.com/v3.1/lang/${languageCode}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data, 'name-asc');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function searchSpecificCountry(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data, 'name-asc');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }