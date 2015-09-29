"""

"""
import platform
import unittest
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains


class AcceptanceTests(unittest.TestCase):
    

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)
        self.command_key = Keys.COMMAND if platform.mac_ver()[0] else Keys.CONTROL

    def tearDown(self):
        self.browser.quit()

    def test_first_three_are_clone_information(self):
        """
         We want to see the 3 Clone Information tags appearing first
        """ 
        # As sanity check confirm that we have title 
        self.browser.get('http://localhost:8000')
        self.assertIn('Annotation Tags', self.browser.title)
        
        # Check that we have tags 
        tags = self.browser.find_elements_by_id('tag-type')
        self.assertEqual(len(tags), 10)
        # Check that the first three are Clone Information
        clone_info = ['Clone Information' for dummy in range(3)]
        first_three = [tag.text for tag in tags[:3]]
        self.assertEqual(clone_info, first_three)
        search_box = self.browser.find_element_by_id('search-text')

        # Find search box and input text specific to the end tag
        search_box.send_keys("end of")
        
        # Confirm that only one tag is returned
        refreshed_tags = self.browser.find_elements_by_id('tag-type')
        self.assertEqual(len(refreshed_tags), 1)

        # Check that the tag returned is indeed the end tag
        end_tag = self.browser.find_element_by_id('tag-text')
        expected_text = "This is the end of sequence clone Dolly."

        # Confirm that end_tag.text is correct
        self.assertEqual(end_tag.text, expected_text)

        # 
        end_tag_feature = self.browser.find_element_by_id('feature-list')
        actions = ActionChains(self.browser)
        actions.move_to_element(end_tag_feature)
        actions.click(end_tag_feature)
        actions.perform()
        sleep(2)
        end_tag_feature.send_keys(self.command_key, 'a')
        end_tag_feature.send_keys(self.command_key, 'c')
        paste_target = self.browser.find_element_by_id('paste-content')
        paste_target.clear()
        paste_target.send_keys(self.command_key, 'v')
        value = paste_target.get_attribute('value')
        end_tag_feature = "Start/End"
        print(Keys.CONTROL, "Key Control")
        print(Keys.COMMAND, "Key Control")
        self.assertIn(end_tag_feature, value)

        # Text that is definitely not part of end tag should not appear
        self.assertNotIn('start of', value)

        ## Sanity Check
        # Currently, selecting the target element 'end tag text' fails
        # This means that text that are not in the target text but exist on the
        # page are found when we paste in the text area
        # This is a framework level problem (i.e. selenium)
        self.assertNotIn('Annotation Tags', value)


if __name__ == '__main__':
    unittest.main()
