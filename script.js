let darkMode = localStorage.getItem("darkMode");
let darkModeToggle = document.querySelector("#dark-mode-toggle");
let darkModeText = document.querySelector(".darkMode-text");
let sunIcon = document.querySelector("#sun-icon")
let moonIcon = document.querySelector(".moon-icon")
let errorMsg = document.querySelector(".error-msg")
let container = document.querySelector(".result-container")


const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    darkModeText.textContent = "LIGHT";
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    darkModeText.textContent = "DARK";
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    localStorage.setItem("darkMode", null)
   
}

if (darkMode === "enabled") {
    enableDarkMode();
}


darkModeToggle.addEventListener("click", () => {
    
    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})


let searchBtn = document.querySelector(".btn")


searchBtn.addEventListener('click', (e) => {

    e.preventDefault();

    let usernameInput = document.getElementById('usernameInput');

    let gitHubUsername = usernameInput.value;
    
    requestUserRepos(gitHubUsername)
      
        .then(response => response.json())
        
        .then(data => {
          
            if (data.message === "Not Found") {
                errorMsg.style.display = "block"
                container.innerHTML = ""
                container.style.display = "none"
            }
            
            else {
                errorMsg.style.display = "none"
                container.style.display = "block"
                container.innerHTML = ""
                
                let resultContainer = document.getElementsByClassName("result-container")[0]

                let customDateArray = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }). formatToParts(new Date(data.created_at)),
                dateParts = {}

                customDateArray.map(({type, value}) => {
                dateParts[type] = value
                })
                data.created_at = (`${dateParts.day} ${dateParts.month} ${dateParts.year}`)
                
                if(data.bio === null) {
                  data.bio = "This profile has no bio"
                }  
                if (data.location === null ) {
                  data.location = "Not Avaiable"
                }   
                if (data.twitter_username === null) {
                  data.twitter_username = "Not Available"
                }
                if (data.blog === "") {
                  data.blog = "User has no blog"
                }          
                if(data.company === null) {
                  data.company = "Not Available"
                } 

            let html = (`
            <div class="result-section">
            <div class="result-name__section">
              <div class="img-section">
                <img src="${data.avatar_url}" alt="user-icon" class="user-icon">
              </div>
              <div class="name-section">
                <div class="name-info__section">
                  <div class="name-info">
                    <h3>${data.login}</h3>
                    <p>@${data.login}</p>
                  </div>
                  <div class="joined-info">
                    <h4>Joined ${data.created_at}</h4>
                  </div>
                </div>
                <p>${data.bio}</p>
              </div>
            </div>
            <div class="bio-info">
              <p>${data.bio}</p>
            </div>
    
            <div class="result-followers__section">
              <div class="repos">
                <h5>Repos</h5>
                <p>${data.public_repos}</p>
              </div>
              <div class="followers">
                <h5>Followers</h5>
                <p>${data.followers}</p>
              </div>
              <div class="following">
                <h5>Following</h5>
                <p>${data.following}</p>
              </div>
            </div>
            
            <div class="result-links__section">
              <div class="location">
                <img src="./assets/icon-location.svg" alt="location img" class="links-icon">
                <h6>${data.location}</h6>
              </div>
              <div class="twitter">
                <img src="./assets/icon-twitter.svg" alt="twitter img" class="links-icon">
                <h6>${data.twitter_username}</h6>
              </div>
              <div class="website">
                <img src="./assets/icon-website.svg" alt="website img" class="links-icon">
                <h6><a href="${data.blog}" target="_blank">${data.blog}</a></h6>
              </div>
              <div class="company">
                <img src="./assets/icon-company.svg" alt="company img" class="links-icon">
                <h6><a href="${data.company}" target="_blank">${data.company}</a></h6>
              </div>
            </div>
          </div>
                        
        `);

            resultContainer.insertAdjacentHTML('beforeend',html);
            
          }           
       })
  })

function requestUserRepos(username) {
    
    return Promise.resolve(fetch(`https://api.github.com/users/${username}`));
}