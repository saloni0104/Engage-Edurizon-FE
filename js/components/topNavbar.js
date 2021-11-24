export const TopNavbar = ({ title, courseId = "", name = "" }) => {
  return `
        <nav class="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <div class="navbar-toggle">
                        <button type="button" class="navbar-toggler">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-10 mt-3">
                                <h4 class="navbar-brand"><span id = "name">${title}</span>
                                ${courseId && "-"}
                                <span style="color:grey" id = "id">${courseId}</span></h4>
                            </div>
                            <div class="col-2 col-md-1">
                                <button class="navbar-toggler mt-4" type="button" data-toggle="collapse"
                                    data-target="#navigation" aria-controls="navigation-index" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span class="navbar-toggler-bar navbar-kebab"></span>
                                    <span class="navbar-toggler-bar navbar-kebab"></span>
                                    <span class="navbar-toggler-bar navbar-kebab"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collapse navbar-collapse justify-content-end" id="navigation">
                <ul class="navbar-nav">
              <li class="nav-link nav-item">
                
                <i class="fas fa-user mr-1"></i>
                  <p>
                    <span class="d-lg-block d-md-block">${name}</span>
                  </p>
                
              </li>
              <li class="nav-item" style="cursor: pointer" onclick="logout()">
                <a class="nav-link">
                <i class="fas fa-sign-out-alt mr-1"></i>
                  <p>
                    <span class="d-lg-block d-md-block" >Logout</span>
                  </p>
                </a>
              </li>
            </ul>
                </div>
            </div>
        </nav>
 `;
};
