import random

# Define a cat-themed ASCII art
cat_ascii_art = """

------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                  



    ,---,.     ,---,.    ,---,.                                 ___      ,---,                                                           ___     
  ,'  .'  \  ,'  .' |  ,'  .' |                        ,--,   ,--.'|_  ,--.' |                                                         ,--.'|_   
,---.' .' |,---.'   |,---.'   |                 .---.,--.'|   |  | :,' |  |  :                                                         |  | :,'  
|   |  |: ||   |   .'|   |   .'                /. ./||  |,    :  : ' : :  :  :                                                         :  : ' :  
:   :  :  /:   :  :  :   :  :               .-'-. ' |`--'_  .;__,'  /  :  |  |,--.           ,--.--.              ,---.     ,--.--.  .;__,'  /   
:   |    ; :   |  |-,:   |  |-,            /___/ \: |,' ,'| |  |   |   |  :  '   |          /       \            /     \   /       \ |  |   |    
|   :     \|   :  ;/||   :  ;/|         .-'.. '   ' .'  | | :__,'| :   |  |   /' :         .--.  .-. |          /    / '  .--.  .-. |:__,'| :    
|   |   . ||   |   .'|   |   .'        /___/ \:     '|  | :   '  : |__ '  :  | | |          \__\/: . .         .    ' /    \__\/: . .  '  : |__  
'   :  '; |'   :  '  '   :  '          .   \  ' .\   '  : |__ |  | '.'||  |  ' | :          ," .--.; |         '   ; :__   ," .--.; |  |  | '.'| 
|   |  | ; |   |  |  |   |  |           \   \   ' \ ||  | '.'|;  :    ;|  :  :_:,'         /  /  ,.  |         '   | '.'| /  /  ,.  |  ;  :    ; 
|   :   /  |   :  \  |   :  \            \   \  |--" ;  :    ;|  ,   / |  | ,'            ;  :   .'   \        |   :    :;  :   .'   \ |  ,   /  
|   | ,'   |   | ,'  |   | ,'             \   \ |    |  ,   /  ---`-'  `--''              |  ,     .-./         \   \  / |  ,     .-./  ---`-'   
`----'     `----'    `----'                '---"      ---`-'                               `--`---'              `----'   `--`---'               



-------------------------------------------------------------------------------------------------------------------------------------------------


   |\---/|
   | ,_, |
    \_`_/-..----.
 ___/ `   ' ,""+ \  sk
(__...'   __\    |`.___.';
  (_,...'(_,.`__)/'.....+


"""

class CatGame:
    def __init__(self):
        self.player = {
            "name": "",
            "cat_name": "",
            "cat_friendship": 0
        }

    def get_choice(self, options):
        print("Your options:", options)
        choice = input("> ").strip().lower()
        while choice not in options:
            print("Invalid choice. Choose from:", options)
            choice = input("> ").strip().lower()
        return choice

    def first_meeting(self):
        print(f"Welcome {self.player['cat_name']}! What will you do on the first meeting?")
        choice = self.get_choice(["pet", "kiss & hug", "ignore", "exit"])

        if choice == "pet":
            print(f"{self.player['cat_name']} seems satisfied with the petting. (+30)")
            self.player['cat_friendship'] += 30
            self.treats()
        elif choice == "kiss & hug":
            print(f"{self.player['cat_name']} got angry and ran away from your house. (-100)")
            self.ending("You scared the cat away.")
        elif choice == "ignore":
            print(f"{self.player['cat_name']} is very interested in you. (+50)")
            self.player['cat_friendship'] += 50
            self.treats()
        elif choice == "exit":
            self.ending("You decided not to meet the cat.")

    def treats(self):
        print(f"A great way to get to know {self.player['cat_name']} better is to give her treats!")
        choice = self.get_choice(["chicken", "tuna", "no treats"])

        if choice == "chicken":
            print(f"{self.player['cat_name']}'s favorite treat is chicken. You can hear her purring! (+50)")
            self.player['cat_friendship'] += 50
        elif choice == "tuna":
            print(f"{self.player['cat_name']} is picky and doesn't prefer fish treats. But it's better than nothing. (-20)")
            self.player['cat_friendship'] -= 20
        elif choice == "no treats":
            print(f"{self.player['cat_name']} is stressed about going on a diet. She's upset. (-100)")
            self.ending("The cat is upset and doesn't want to be your friend.")

        self.ending(f"You and {self.player['cat_name']} are becoming friends!")

    def ending(self, message):
        print(message)
        friendship_percentage = self.player['cat_friendship']
        print(f"Friendship Percentage with {self.player['cat_name']}: {friendship_percentage}%")
        if friendship_percentage >= 100:
            print(f"Congratulations! You and {self.player['cat_name']} are best friends!")
        elif friendship_percentage >= 50:
            print(f"You and {self.player['cat_name']} have become friends.")
        else:
            print(f"Unfortunately, you couldn't become friends with {self.player['cat_name']}.")

    def main(self):
        # Display cat-themed ASCII art
        print(cat_ascii_art)

        print("Hi, nice to meet you! What should I call you?")
        self.player['name'] = input("Please enter your name > ")
        print(f"Could you name the cat, {self.player['name']}?")
        self.player['cat_name'] = input("Please enter a cat’s name > ")

        print(f"Hi '{self.player['name']}'. Your friend is going on a trip!")
        print(f"You've agreed to take care of your friend's cat, '{self.player['cat_name']}', for a week.")
        print(f"Can you become friends with {self.player['cat_name']} before she goes back to her friend's house?")
        input("Press enter to start > ")

        self.first_meeting()

if __name__ == "__main__":
    game = CatGame()
    game.main()
