
import sys
import collections
import gensim, logging
#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

courseNum=str(sys.argv[1])
model = gensim.models.Word2Vec.load('course_word2vec')
x=[]
try:
	aimingcourse=model.similar_by_word(courseNum)
	for course in aimingcourse:
		print(str(course[0]))
	for course in aimingcourse:
		print(str(course[1]))
except KeyError as e:
	print('Sorry, there is not sufficient records about this course, so we can not give you recommendation with strong confidence')
finally:
	pass


	


