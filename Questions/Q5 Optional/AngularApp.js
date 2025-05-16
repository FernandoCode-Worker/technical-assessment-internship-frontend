var app = angular.module("firstAngularApp", ["ngRoute", "ngSanitize"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"home.html",
        controller:"homeController"
    })
    .when("/Form",{
        templateUrl:"form.html",
        controller:"formController"
    })
    .when("/Validator",{
        templateUrl:"validator.html",
        controller:"validatorController"
    })
    .when("/BusinessLogic",{
        templateUrl:"businessLogic.html",
        controller:"businessLogicController"
    })
    .otherwise({
        redirectTo:"/"
    });
});

app.controller("homeController",function($scope){
    $scope.message="Welcome to my first AngularJS app!";
});

app.service('messageService', function() {
    var messages = {
        success: '',
        error: ''
    };
    
    return {
        setMessages: function(success, error) {
            messages.success = success;
            messages.error = error;
        },
        getMessages: function() {
            return messages;
        },
        clearMessages: function() {
            messages.success = '';
            messages.error = '';
        }
    };
});

app.controller("formController", function($scope, $sce, $http, $location, messageService){
    $scope.success_message = "";
    $scope.error_message = "";
    $scope.message="This is the form page.";
    $scope.user = {};
    
    var formHtml = `
    <div class="bg-transparent">
        <form ng-submit="submitForm()">
            <label>Name:</label>
            <input type="text" ng-model="user.name" required />
            
            <label>Email:</label>
            <input type="email" ng-model="user.email" required />
            
            <button type="submit">Submit</button>
        </form>
    </div>  
    `;
    
    $scope.formHtml = $sce.trustAsHtml(formHtml);

    $scope.submitForm = function() {
        if ($scope.user && $scope.user.name && $scope.user.email) {
            $http.post("https://jsonplaceholder.typicode.com/posts", $scope.user)
                .then(function(response){
                    messageService.setMessages("Form submitted successfully", "");
                    $location.path('/Validator');
                })
                .catch(function(error){
                    messageService.setMessages("", "Form submission failed");
                    $location.path('/Validator');
                });
        } else {
            alert("Please fill in all fields.");
        }
    };
});


app.controller("validatorController", function($scope, messageService) {
    $scope.message = "This is the validator page.";
    $scope.success = "";
    $scope.error = "";

    var messages = messageService.getMessages();
    $scope.success = messages.success;
    $scope.error = messages.error;

    if (!$scope.$$phase) {
        $scope.$apply();
     }

     messageService.clearMessages();
});

app.controller("businessLogicController",function($scope, $sce){
    $scope.message="This is the business logic page.";
    var businessLogic=`
    <div class="bg-info">
    <ol>
        <li><strong>Property Management System (PMS)</strong>
            <ul>
            <li>Guest Folio Management: Tracks charges, payments, balances; supports sub-folios and balance transfers.</li>
            <li>Group Reservations: Manages group check-ins/outs and centralized billing.</li>
            <li>Housekeeping Management: Assigns tasks, tracks room status, and cleaning timelines.</li>
            <li>Maintenance Tracking: Logs and monitors maintenance requests and completions.</li>
            <li>Financial Accounting: Handles taxes, invoicing, and financial audit trails.</li>
            <li>Cashier and Shift Management: Manages cashier operations, shift summaries, and fraud controls.</li>
            </ul>
        </li>

        <li><strong>Hotel Booking Engine</strong>
            <ul>
            <li>Direct Booking: Enables bookings via website, Facebook, WhatsApp, etc.</li>
            <li>Promotions and Discounts: Supports promo code configurations and rule-based discounts.</li>
            <li>Upselling: Offers add-ons (e.g., breakfast, airport transfer) during booking.</li>
            <li>Abandoned Cart Recovery: Sends automated reminders for incomplete bookings.</li>
            <li>Tax Compliance: Automatically calculates and displays applicable taxes.</li>
            </ul>
        </li>

        <li><strong>Channel Manager</strong>
            <ul>
            <li>OTA Integration: Syncs availability, pricing, and reservations across OTAs like Booking.com, Agoda, etc.</li>
            <li>Rate Management: Enables dynamic pricing and rate parity maintenance.</li>
            </ul>
        </li>

        <li><strong>Automation & Integrations</strong>
            <ul>
            <li>Pre-Arrival Web Check-In: Allows guests to check in online before arrival.</li>
            <li>Self-Check-In Kiosk: Provides contactless guest check-in/out.</li>
            <li>E-Invoicing: Auto-generates and emails receipts/invoices.</li>
            <li>Hardware Integration: Works with devices like smart locks and POS systems.</li>
            </ul>
        </li>

        <li><strong>Reporting & Analytics</strong>
            <ul>
            <li>User Activity Logs: Tracks staff activity for transparency and accountability.</li>
            <li>Financial Reports: Provides insights into revenue, occupancy, and performance.</li>
            <li>Guest Feedback: Collects and analyzes guest reviews and ratings.</li>
            </ul>
        </li>

        <li><strong>Website Content Management System (CMS)</strong>
            <ul>
            <li>Customizable Website Design: Offers drag-and-drop site management tools.</li>
            <li>SEO Optimization: Enhances visibility in search engines.</li>
            <li>Content Updates: Easily update promotions, blogs, and other site content.</li>
            </ul>
        </li>
        </ol>
    </div>`
    $scope.businessLogic = $sce.trustAsHtml(businessLogic);
});