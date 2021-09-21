# grubDash

> front end repository: https://github.com/keithfrazier98/starter-grub-dash-front-end

This is the API for the grubDash repository, responsible for requests made to handle orders and dishes.

Technology:

        - cors
        - cross-conf-env
        - express

The data directory contains files for the orders and dishes; the dishes and orders requests modify data in these files. 

dishes:

    the dishes router file handles requests made to '/dishes' and '/dishes/:dishId'

        '/dishes'
            - get: requests all dish data
            - post: posts a new dish to the data

        '/dishes/:dishId'
            - get: requests a single dish
            - put: modifies an existing dish

orders: 

    the orders router file handles requests made to '/orders' and '/orders/:orderId'

        '/orders' 
            - get: requests all past/present orders 
            - post: posts a new order to the data

        '/orders/:ordersId'
            - get: requests a single order 
            - put: modifies an existing order
            - delete: removes an order from the data


