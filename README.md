# iseGuestPortal
Update guest Portals

## On before you run the application for the first time install dependencies
From the command line, navigate to the folder "iseGuestPortal"
Execute the following command from the Command line:
npm install

## Before you run the application for the first time add a ".env" file
make a file ".env"
add the folowing lines and replace the <<>> and everything inbetween:
ISE_AUTH = Basic <<yourBasicAuthStringHere>>
ISE_SERVER = <<yourServersFQDN>>:<<9060>>

## Before you run the application for the first time add a "iseGuestConfig.json" file
make a file "iseGuestConfig.json"
add JSON with this format
replace the <<>> and everything inbetween:
```
[
	{
		"name": "<<TEST>>",
		"epigId": "<<2a6866y0-4f57-77e8-abb8-024230267f4a>>",
		"iuId": "<<e5zz7zz3-a122-4d4k-t922-f3bb51d1114e>>",
		"iuName": "<<testGuest>>",
		"iuPassword": "<<SStarwW2aArs!!11>>"
	},
	{
		"name": "<<yakaYUak_Guests>>",
		"epigId": "<<re077be9-4d59-118f-aeb8-111131111f4b>>",
		"iuId": "<<8f111111-f8f7-6666-90fg-5fcab9tr5658>>",
    "iuName": "<<guest-nfcs>>",
		"iuPassword": "<<starwars12>>"
	},
	{
		"name": "<<CastleGrayskull>>",
		"epigId": "<<12djkfkfgf111-db00-kd94-qn85-111110fg45pa>>",
		"iuId": "<<z7bce953-6c4c-77tt4-8fbe-d91fbaa9451b>>",
		"iuName": "<<guest-texas>>",
		"iuPassword": "<<starwars>>"
	}, ...
]
```

## How start the CLI application
From the command line, navigate to the folder "iseGuestPortal"
Execute the following command from the Command line:

node app.js

