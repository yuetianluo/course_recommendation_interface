
import sys
import collections
import gensim, logging
#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

courseNum=str(sys.argv[1])
model = gensim.models.Word2Vec.load('course_word2vec')
x=[];
aimingcourse=model.similar_by_word(courseNum)
for course in aimingcourse:
	print(str(course[0]))


	


